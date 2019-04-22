//
//  EXPrint.m
//  Exponent
//
//  Created by Alicja Warchał on 07.02.2018.
//  Copyright © 2018 650 Industries. All rights reserved.
//

#import "EXPrint.h"
#import "EXScopedModuleRegistry.h"
#import "EXUtil.h"
#import "EXModuleRegistryBinding.h"
#import "EXPrintPDFRenderTask.h"

#import <EXCore/EXUtilitiesInterface.h>
#import <EXFileSystemInterface/EXFileSystemInterface.h>

#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

NSString *const EXPrintOrientationPortrait = @"portrait";
NSString *const EXPrintOrientationLandscape = @"landscape";

@interface EXPrint () <UIPrintInteractionControllerDelegate, UIPrinterPickerControllerDelegate>

@property (nonatomic, strong) NSMutableDictionary<NSString *, UIPrinter *> *printers;

@end

@implementation EXPrint

@synthesize bridge = _bridge;

- (instancetype)init
{
  if (self = [super init]) {
    _printers = [NSMutableDictionary new];
  }
  return self;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (NSDictionary *)constantsToExport
{
  return @{
           @"Orientation": @{
               @"portrait": EXPrintOrientationPortrait,
               @"landscape": EXPrintOrientationLandscape,
               },
           };
}

RCT_EXPORT_MODULE(ExponentPrint);

RCT_EXPORT_METHOD(print:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self _getPrintingDataForOptions:options callback:^(NSData *printingData, NSDictionary *errorDetails) {
    if (errorDetails != nil) {
      reject(errorDetails[@"code"], errorDetails[@"message"], RCTErrorWithMessage(errorDetails[@"message"]));
      return;
    }
    
    UIPrintInteractionController *printInteractionController = [self _makePrintInteractionControllerWithOptions:options];
    
    if (printingData == nil) {
      // Missing printing data.
      // Let's check if someone wanted to use previous implementation for `html` option
      // which uses print formatter instead of NSData instance.
      
      if (options[@"markupFormatterIOS"]) {
        NSString *htmlString = [RCTConvert NSString:options[@"markupFormatterIOS"]];
        
        if (htmlString != nil) {
          UIMarkupTextPrintFormatter *formatter = [[UIMarkupTextPrintFormatter alloc] initWithMarkupText:htmlString];
          printInteractionController.printFormatter = formatter;
        } else {
          NSString *message = [NSString stringWithFormat:@"The specified html string is not valid for printing."];
          reject(@"E_HTML_INVALID", message, RCTErrorWithMessage(message));
          return;
        }
      } else {
        reject(@"E_NOTHING_TO_PRINT", @"No data to print. You must specify `uri` or `html` option.", nil);
        return;
      }
    }
    
    printInteractionController.printingItem = printingData;
    
    NSString *printerURL;
    UIPrinter *printer;
    
    if (options[@"printerUrl"]) {
      // @tsapeta: Printing to the printer created with given URL ([UIPrinter printerWithURL:]) doesn't work for me,
      // it seems to be a bug in iOS however I've found confirmation only on Xamarin forums.
      // https://forums.xamarin.com/discussion/58518/creating-a-working-uiprinter-object-from-url-for-dialogue-free-printing
      // The hacky solution is to save all UIPrinters that have been selected using `selectPrinter` method and reuse
      // them when printing to specific printer.
      // I guess it's also safe to fall back to this not working solution since it might be fixed in the future.
      
      printerURL = [RCTConvert NSString:options[@"printerUrl"]];
      printer = [self.printers objectForKey:printerURL];
      
      if (printer == nil) {
        printer = [UIPrinter printerWithURL:[NSURL URLWithString:printerURL]];
      }
    }
    
    void (^completionHandler)(UIPrintInteractionController *, BOOL, NSError *) =
    ^(UIPrintInteractionController *printController, BOOL completed, NSError *error) {
      if (error != nil) {
        reject(@"E_CANNOT_PRINT", @"Printing job encountered an error.", error);
        return;
      }
      
      if (completed) {
        resolve(nil);
      } else {
        reject(@"E_PRINT_INCOMPLETE", @"Printing did not complete.", nil);
      }
    };
    
    if (printer != nil) {
      [printInteractionController printToPrinter:printer completionHandler:completionHandler];
    } else if ([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad) { // iPad
      UIView *view = [[UIApplication sharedApplication] keyWindow].rootViewController.view;
      [printInteractionController presentFromRect:view.frame inView:view animated:YES completionHandler:completionHandler];
    } else { // iPhone
      [printInteractionController presentAnimated:YES completionHandler:completionHandler];
    }
  }];
}


RCT_EXPORT_METHOD(selectPrinter:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  UIPrinterPickerController *printPicker = [UIPrinterPickerController printerPickerControllerWithInitiallySelectedPrinter:nil];
  
  printPicker.delegate = self;
  
  void (^completionHandler)(UIPrinterPickerController *, BOOL, NSError *) = ^(UIPrinterPickerController *printerPicker, BOOL userDidSelect, NSError *error) {
    if (!userDidSelect && error) {
      reject(@"E_PRINTER_SELECT_ERROR", @"There was a problem with the printer picker.", error);
    } else {
      [UIPrinterPickerController printerPickerControllerWithInitiallySelectedPrinter:printerPicker.selectedPrinter];
      if (userDidSelect) {
        UIPrinter *pickedPrinter = printerPicker.selectedPrinter;
        [self->_printers setObject:pickedPrinter forKey:pickedPrinter.URL.absoluteString];
        
        resolve(@{
                  @"name" : pickedPrinter.displayName,
                  @"url" : pickedPrinter.URL.absoluteString,
                  });
      } else {
        reject(@"E_PRINTER_SELECT_CANCELLED", @"Printer picker has been cancelled", nil);
      }
    }
  };
  
  if ([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad) { // iPad
    UIView *view = [[UIApplication sharedApplication] keyWindow].rootViewController.view;
    [printPicker presentFromRect:view.frame inView:view animated:YES completionHandler:completionHandler];
  } else { // iPhone
    [printPicker presentAnimated:YES completionHandler:completionHandler];
  }
}

RCT_REMAP_METHOD(printToFileAsync,
                 printToFileWithOptions:(nonnull NSDictionary *)options
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject)
{
  NSString *format = [RCTConvert NSString:options[@"format"]];
  
  if (format != nil && ![format isEqualToString:@"pdf"]) {
    reject(@"E_PRINT_UNSUPPORTED_FORMAT", [NSString stringWithFormat:@"Given format '%@' is not supported.", format], nil);
    return;
  }
  
  EXPrintPDFRenderTask *renderTask = [EXPrintPDFRenderTask new];
  
  [renderTask renderWithOptions:options completionHandler:^(NSData *pdfData) {
    if (pdfData != nil) {
      NSString *filePath = [self _generatePath];
      if (!filePath) {
        reject(@"E_PRINT_SAVING_ERROR", @"Error occurred while generating path for PDF: generated path empty, is FileSystem module present?", nil);
        return;
      }
      NSString *uri = [[NSURL fileURLWithPath:filePath] absoluteString];
      
      NSError *error;
      BOOL success = [pdfData writeToFile:filePath options:NSDataWritingAtomic error:&error];
      
      if (!success) {
        reject(@"E_PRINT_SAVING_ERROR", @"Error occurred while saving PDF.", error);
        return;
      }
      
      NSMutableDictionary *result = [@{ @"uri": uri, @"numberOfPages": @(renderTask.numberOfPages) } mutableCopy];
      
      if (options[@"base64"] != nil && [options[@"base64"] boolValue]) {
        result[@"base64"] = [pdfData base64EncodedStringWithOptions:0];
      }
      
      resolve(result);
    } else {
      reject(@"E_PRINT_PDF_NOT_RENDERED", @"Error occurred while printing to PDF.", nil);
    }
  }];
}

#pragma mark - UIPrintInteractionControllerDelegate

- (UIViewController *)printInteractionControllerParentViewController:(UIPrintInteractionController *)printInteractionController
{
  id<EXUtilitiesInterface> utils = [_bridge.scopedModules.moduleRegistry getModuleImplementingProtocol:@protocol(EXUtilitiesInterface)];
  return utils.currentViewController;
}

#pragma mark - UIPrinterPickerControllerDelegate

- (UIViewController *)printerPickerControllerParentViewController:(UIPrinterPickerController *)printerPickerController
{
  id<EXUtilitiesInterface> utils = [_bridge.scopedModules.moduleRegistry getModuleImplementingProtocol:@protocol(EXUtilitiesInterface)];
  return utils.currentViewController;
}

#pragma mark - internal

- (NSData *)_dataFromUri:(NSString *)uri
{
  NSURL *candidateURL = [NSURL URLWithString:uri];
  
  // iCloud url looks like: `file:///private/var/mobile/Containers/Data/Application/[...].pdf`
  // data url looks like: `data:application/pdf;base64,JVBERi0x...`
  BOOL isValidURL = (candidateURL && candidateURL.scheme);
  
  if (isValidURL) {
    // TODO: This needs updated to use NSURLSession dataTaskWithURL:completionHandler:
    return [NSData dataWithContentsOfURL:candidateURL];
  }
  return nil;
}

- (UIPrintInteractionController *)_makePrintInteractionControllerWithOptions:(NSDictionary *)options
{
  NSString *uri = [RCTConvert NSString:options[@"uri"]];
  UIPrintInteractionController *printInteractionController = [UIPrintInteractionController sharedPrintController];
  printInteractionController.delegate = self;
  
  UIPrintInfo *printInfo = [UIPrintInfo printInfo];
  
  printInfo.outputType = UIPrintInfoOutputGeneral;
  printInfo.jobName = [uri lastPathComponent];
  printInfo.duplex = UIPrintInfoDuplexLongEdge;
  printInfo.orientation = [self _getPrintOrientationFromOption:options[@"orientation"]];
  
  printInteractionController.printInfo = printInfo;
  printInteractionController.showsPageRange = YES;
  printInteractionController.showsNumberOfCopies = YES;
  printInteractionController.showsPaperSelectionForLoadedPapers = YES;
  
  return printInteractionController;
}

- (void)_getPrintingDataForOptions:(nonnull NSDictionary *)options callback:(void(^)(NSData *, NSDictionary *))callback
{
  NSData *printData;
  
  if (options[@"uri"]) {
    NSString *uri = [RCTConvert NSString:options[@"uri"]];
    printData = [self _dataFromUri:uri];
    
    if (printData != nil) {
      callback(printData, nil);
    } else {
      callback(nil, @{
                      @"code": @"E_URL_INVALID",
                      @"message": [NSString stringWithFormat:@"The specified url is not valid for printing: %@", uri],
                      });
    }
    return;
  }
  
  if (options[@"html"]) {
    __block EXPrintPDFRenderTask *renderTask = [EXPrintPDFRenderTask new];
    
    [renderTask renderWithOptions:options completionHandler:^(NSData *pdfData) {
      if (pdfData != nil) {
        callback(pdfData, nil);
      } else {
        callback(nil, @{
                        @"code": @"E_PRINT_PDF_NOT_RENDERED",
                        @"message": @"Error occurred while printing HTML to PDF format.",
                        });
      }
      renderTask = nil;
    }];
    return;
  }
  
  callback(nil, nil);
}

- (UIPrintInfoOrientation)_getPrintOrientationFromOption:(NSString *)orientation
{
  if ([orientation isEqualToString:EXPrintOrientationLandscape]) {
    return UIPrintInfoOrientationLandscape;
  }
  return UIPrintInfoOrientationPortrait;
}

- (NSString *)_generatePath
{
  id<EXFileSystemInterface> fileSystem = [_bridge.scopedModules.moduleRegistry getModuleImplementingProtocol:@protocol(EXFileSystemInterface)];
  if (!fileSystem) {
    return nil;
  }
  NSString *directory = [fileSystem.cachesDirectory stringByAppendingPathComponent:@"Print"];
  NSString *fileName = [[[NSUUID UUID] UUIDString] stringByAppendingString:@".pdf"];
  [fileSystem ensureDirExistsWithPath:directory];
  
  return [directory stringByAppendingPathComponent:fileName];
}

@end

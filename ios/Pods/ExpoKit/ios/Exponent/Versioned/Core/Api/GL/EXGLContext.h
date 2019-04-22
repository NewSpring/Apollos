//
//  EXGLContext.h
//  Exponent
//
//  Created by Tomasz Sapeta on 11.01.2018.
//  Copyright © 2018 650 Industries. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <UEXGL.h>
#import <OpenGLES/EAGL.h>
#import "EXGLObjectManager.h"

NS_ASSUME_NONNULL_BEGIN

@class EXGLContext;

@protocol EXGLContextDelegate <NSObject>

- (void)glContextFlushed:(nonnull EXGLContext *)context;
- (void)glContextInitialized:(nonnull EXGLContext *)context;
- (void)glContextWillDestroy:(nonnull EXGLContext *)context;
- (UEXGLObjectId)glContextGetDefaultFramebuffer;

@end

@interface EXGLContext : NSObject

- (instancetype)initWithDelegate:(nullable id<EXGLContextDelegate>)delegate andManager:(nonnull EXGLObjectManager *)manager;
- (void)initialize:(void(^ _Nullable)(BOOL))callback;
- (BOOL)isInitialized;
- (EAGLContext *)createSharedEAGLContext;
- (void)runAsync:(void(^)(void))callback;
- (void)runInEAGLContext:(EAGLContext*)context callback:(void(^)(void))callback;
- (void)takeSnapshotWithOptions:(nonnull NSDictionary *)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)destroy;

// "protected"
@property (nonatomic, assign) UEXGLContextId contextId;
@property (nonatomic, strong, nonnull) EAGLContext *eaglCtx;
@property (nonatomic, weak, nullable) id <EXGLContextDelegate> delegate;

@end

NS_ASSUME_NONNULL_END

#! usr/bin/python

import argparse
import os
import sys
import json
import logging

def _getArgs(noArgs = False):
    """Get arguments from command line."""

    parser = argparse.ArgumentParser(
        description="This will bump the version numbers for NS Apollos files.")
    parser.add_argument("-v", "--version", help="Version number to update to")
    parser.add_argument("--ota", action="store_true", help="This will publish the bundle to Expo")

    if noArgs:
        parser.print_help()
        return 0

    args = parser.parse_args()
    return args

def _getVersion():
    """This will get the current version number from the package.json file."""
    with open("package.json", "r") as f:
        data = json.load(f)
    return data["version"]
        
def _replaceLine(textFile, lineSearch, newLine, lineOffset = 0):
    """This will replace a line in a file with a new line."""
    try:
        with open (textFile, "r") as f:
            data = []
            found = False

            # this is if the version number to replace is on a different line
            # than the search string
            replaceThisLine = lineOffset

            for i, line in enumerate(f.readlines()):
                if (lineSearch in line) or found: 
                    found = True
                    if replaceThisLine == 0: 
                        data.append(newLine + "\n")
                        found = False
                    else:
                        replaceThisLine -= 1
                        data.append(line)
                else:
                    data.append(line)
    except IOError:
        logging.error("File does not exist")
        return 

    with open (textFile, "w") as f:
        f.writelines(data)
                
if __name__ == "__main__":

    # if no args, print help menu and exit
    if len(sys.argv) == 1:
        _getArgs(True)
        sys.exit(1)
    
    # get command line arguments
    args = _getArgs()
    
    # if version number is not specified, this will get it from package.json
    if not args.version:
        version = _getVersion()
        logging.info("Current Version: " + version)
    else:
        version = args.version
    
    # write over JS files
    _replaceLine("./app-config.js", "version:", "    version: '" + version + "',") 
    _replaceLine("./package.json", "version\":", "  \"version\": \"" + version + "\",") 
    
    # write over Android files
    _replaceLine("./android/app/build.gradle", "versionName", "    versionName '" + version + "'")
    _replaceLine("./android/app/src/main/java/host/exp/exponent/generated/AppConstants.java", "String RELEASE", "  public static final String RELEASE_CHANNEL = \"v" + version + "\";")
 
    # write over iOS files
    _replaceLine("./ios/newspring/Supporting/Info.plist", "CFBundleShortVersionString", "	<string>" + version + "</string>", 1) 
    _replaceLine("./ios/newspring/Supporting/EXShell.plist", "releaseChannel", "	<string>v" + version + "</string>", 1) 

    # publish to Expo
    if args.ota:
        
        # this will make an Expo publish call with the given version number
        os.system("NODE_ENV=production yarn run-with-settings \"yarn run exp publish --release-channel v" + version + "\"")
 

#! usr/bin/python

import argparse
import os

def _getArgs():
    """Get arguments from command line."""

    parser = argparse.ArgumentParser(
        description="This will bump the version numbers for NS Apollos files.")
    parser.add_argument("version", help="Version string to be copied in")
    parser.add_argument("--ota", action="store_true", help="This will publish the bundle to Expo")
    args = parser.parse_args()
    return args

def _replaceLine(textFile, lineSearch, newLine, lineOffset = 0):
    """This will replace a line in a file with a new line."""
    try:
        with open (textFile, "r") as f:
            data = []
            found = False
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
        print "File does not exist"
        return 

    with open (textFile, "w") as f:
        f.writelines(data)
                
if __name__ == "__main__":

    # get arguments
    args = _getArgs()
    version = args.version
    
    # write over JS files
    _replaceLine("./app-config.js", "version:", "    version: '" + version + "',") 
    
    # write over Android files
    _replaceLine("./android/app/build.gradle", "versionName", "    versionName '" + version + "'")
    _replaceLine("./android/app/src/main/java/host/exp/exponent/generated/AppConstants.java", "String RELEASE", "  public static final String RELEASE_CHANNEL = \"v" + version + "\";")
 
    # write over iOS files
    _replaceLine("./ios/newspring/Supporting/Info.plist", "CFBundleShortVersionString", "	<string>" + version + "</string>", 1) 
    _replaceLine("./ios/newspring/Supporting/EXShell.plist", "releaseChannel", "	<string>v" + version + "</string>", 1) 

    # publish to Expo
    if args.ota:
        os.system("NODE_ENV=production yarn run-with-settings \"yarn run exp publish --release-channel v" + args.version + "\"")
        print "NODE_ENV=production yarn run-with-settings \"yarn run exp publish --release-channel v" + args.version + "\"" 
 

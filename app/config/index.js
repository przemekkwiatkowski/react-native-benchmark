import DebugConfig from './debugConfig'
import AppConfig from './app' // eslint-disable-line no-unused-vars

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = !DebugConfig.yellowBox
}

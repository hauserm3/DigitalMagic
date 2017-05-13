import {getDeviceListWithDeviceType} from "../apiSamsung/getDeviceListWithDeviceType";

export function getAllDevices(groupId){
  return getDeviceListWithDeviceType(groupId)
}
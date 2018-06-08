export const AUTHENTICATION_URI = `/api/system/v1/identitymgmt/login`;

export const UNCLAMIED_DEVICES_LIST_URI = '/api/v1/onboarding/pnp-device?state=Error,Planned,Onboarding,Unclaimed';

export const RF_PROFILE_LIST_URI = '/api/v1/commonsetting/wlan/-1/?key=rfprofile.info';
export const SITES_WITH_FLOOR_LIST_URI = '/api/v1/group?groupType=SITE&additionalInfo.attributes.type=floor';

export const CLAIM_AP_URI = '/api/v1/dna/device-claim';
export const POLLTASK_URI = '/api/v1/task/';
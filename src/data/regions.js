const regions = [
  {
    code: 'us-east-1',
    name: 'US East (N. Virginia)'
  },
  {
    code: 'us-east-2',
    name: 'US East (Ohio)'
  },
  {
    code: 'us-west-1',
    name: 'US West (N. California)'
  },
  {
    code: 'us-west-2',
    name: 'US West (Oregon)'
  },
  {
    code: 'ap-south-1',
    name: 'Asia Pacific (Mumbai)'
  },
  {
    code: 'ap-northeast-2',
    name: 'Asia Pacific (Seoul)'
  },
  {
    code: 'ap-northeast-3',
    name: 'Asia Pacific (Osaka-Local)'
  },
  {
    code: 'ap-southeast-1',
    name: 'Asia Pacific (Singapore)'
  },
  {
    code: 'ap-southeast-2',
    name: 'Asia Pacific (Sydney)'
  },
  {
    code: 'ap-northeast-1',
    name: 'Asia Pacific (Tokyo)'
  },
  {
    code: 'ca-central-1',
    name: 'Canada (Central)'
  },
  {
    code: 'eu-central-1',
    name: 'EU (Frankfurt)'
  },
  {
    code: 'eu-west-1',
    name: 'EU (Ireland)'
  },
  {
    code: 'eu-west-2',
    name: 'EU (London)'
  },
  {
    code: 'eu-west-3',
    name: 'EU (Paris)'
  },
  {
    code: 'sa-east-1',
    name: 'South America (São Paulo)'
  }
]

export default regions

export const regionsCodes = regions.map(r => r.code)

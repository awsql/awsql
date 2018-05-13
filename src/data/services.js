import keyBy from 'lodash/keyBy'

const services = [
  {
    code: 'ElasticBeanstalk',
    className: 'ElasticBeanstalk',
    name: 'Elastic Beanstalk',
    collections: [
      {
        code: 'applications',
        name: 'Applications',
        method: 'describeApplications',
        resultPath: 'Applications'
      }
    ]
  },
  {
    code: 'EC2',
    name: 'EC2',
    className: 'EC2',
    collections: [
      {
        code: 'instances',
        name: 'Instances',
        method: 'describeInstances',
        resultPath: 'Reservations'
      }
    ]
  },
  {
    code: 'Lambda',
    name: 'Lambda',
    className: 'Lambda',
    collections: [
      {
        code: 'functions',
        name: 'Functions',
        method: 'listFunctions',
        resultPath: 'Functions'
      }
    ]
  }
]

export default services

export const servicesCodes = services.map(s => s.code)

export const keyedServices = keyBy(services.map(service => ({
  ...service,
  collections: keyBy(service.collections, 'code')
})), 'code')

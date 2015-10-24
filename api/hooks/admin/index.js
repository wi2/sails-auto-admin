import Marlinspike from 'marlinspike'

class Admin extends Marlinspike {
  constructor (sails) {
    super(sails, module)
  }

}

export default Marlinspike.createSailsHook(Admin)

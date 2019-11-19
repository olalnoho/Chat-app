class Namespace {
   constructor(id, nsTitle, img, endpoint) {
      this.id = id
      this.nsTitle = nsTitle
      this.img = img
      this.endpoint = endpoint
      this.rooms = []
   }

   addRoom(roomObj) {
      this.rooms.push(roomObj)
   }
}

class Room {
   constructor(roomId, roomTitle, namespace, privateRoom = false) {
      this.roomId = roomId
      this.roomTitle = roomTitle
      this.namespace = namespace
      this.privateRoom = privateRoom
      this.history = []
   }

   addMessage(message) {
      this.history.push(message)
   }

   clearHistory() {
      this.history = []
   }
}

let namespaces = [];
let dogNs = new Namespace(0, 'Dogs', 'https://images.vexels.com/media/users/3/160071/isolated/lists/8a4c9b162a4495af9185c91a57b6334f-cute-dog-puppy-tail-ear-tongue-flat.png', '/dogs');
let cookieNs = new Namespace(1, 'Cookies', 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Apps-preferences-web-browser-cookies-icon.png', '/cookies');
let ieNs = new Namespace(2, 'Explorer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Internet_Explorer_9_icon.svg/256px-Internet_Explorer_9_icon.svg.png', '/ie');

namespaces.push(dogNs, cookieNs, ieNs);

dogNs.addRoom(new Room(0, 'Funny dogs', 'Dogs'));
dogNs.addRoom(new Room(1, 'Poodles', 'Dogs'));
dogNs.addRoom(new Room(2, 'Treats', 'Dogs'));

cookieNs.addRoom(new Room(0, 'Baking', 'Cookies'));
cookieNs.addRoom(new Room(1, 'Eating', 'Cookies'));
cookieNs.addRoom(new Room(2, 'Favourites', 'Cookies'));
cookieNs.addRoom(new Room(3, 'General Cookie talk', 'Cookies'));

ieNs.addRoom(new Room(0, 'General I.E Talk', 'Explorer'));
ieNs.addRoom(new Room(1, 'Edge sucks', 'Explorer'));
ieNs.addRoom(new Room(2, 'IE is best', 'Explorer'));
ieNs.addRoom(new Room(3, 'Why we like IE', 'Explorer'));

module.exports = namespaces;
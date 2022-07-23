// Initializing domain device id class
export class Ddid {
  constructor() {
    if (Ddid.instance instanceof Ddid) {
      return Ddid.instance;
    }

    // Function to check if there is already saved cookie
    this.getCookie = (key) => {
      const cookie = `; ${document.cookie}`;
      const splitted = cookie.split(`; ${key}=`);
      if (splitted.length === 2) return splitted.pop().split(";").shift();
    };

    // Function to generating id
    this.generateId = () => {
      let ddId = "";
      let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (let i = 0; i < 25; i++) {
        ddId += chars.charAt(Math.floor(Math.random() * 36));
      }
      return ddId;
    };

    // Function for setting cookie to browser
    // If there is no cookie with name 'id', setting id cookie to browser
    this.setCookie = () => {
      let expiration = new Date();
      expiration.setFullYear(expiration.getFullYear() + 1);
      if (!this.getCookie("id")) {
        document.cookie = `id=${this.generateId()}; expires=${expiration.toGMTString()};`;
      }
    };

    // Set class as singleton
    Object.freeze(this);
    Ddid.instance = this;
  }

  // Call to generate id
  ddid() {
    this.setCookie();
  }
}

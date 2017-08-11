export default class FakeUploader {
  constructor (filePath) {
    if (!filePath) {
      throw new Error('File path required to upload!');
    }

    this._filePath = filePath;
    this._amountUploaded = 0.0;
    this._totalToUpload = 10.0;
    this._registeredListeners = {};
  }

  emit (eventName, eventPayload) {
    if (this._registeredListeners[eventName]) {
      this._registeredListeners[eventName](eventPayload);
    }
    return this;
  }

  on (eventName, listenerToRegister) {
    this._registeredListeners[eventName] = listenerToRegister;
    return this;
  }

  upload () {
    this.chunk();
    return this;
  }

  chunk () {
    const fakeChunkSize = Math.random();
    setTimeout(() => {
      this._amountUploaded += fakeChunkSize;
      if (this._amountUploaded >= this._totalToUpload) {
        this.emit('finished');
      } else {
        this.emit('progress', this._amountUploaded / this._totalToUpload);
        this.chunk();
      }
    }, fakeChunkSize * 500);
    return this;
  }
}

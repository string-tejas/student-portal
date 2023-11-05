class LamportClock {
    constructor() {
        this.clock = 0;
    }

    tick() {
        this.clock++;
        // this.printTime();
    }

    getTime() {
        return this.clock;
    }

    updateTime(receivedTime) {
        this.clock = Math.max(this.clock, receivedTime) + 1;
        // this.printTime();
    }

    printTime() {
        console.log("File Uploader clock =>", this.clock);
    }
}

module.exports = LamportClock;

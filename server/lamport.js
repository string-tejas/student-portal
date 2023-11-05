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
        const behind = this.clock < receivedTime;
        this.clock = Math.max(this.clock, receivedTime) + 1;
        // this.printTime();
        return behind;
    }

    printTime() {
        console.log("Main server clock =>", this.clock);
    }
}

export default LamportClock;

var colorSchemeMapping = {
    without_smoothing: {
        text: "Without Smoothing",
        method: function (params) {
            escapeCount = params.escapeCount / params.Iiteration * 255;
            return colorUtilitiesMethod.getGrayScaleColorString(Math.floor(params.escapeCount));
        }
    },
    with_smoothing: {
        text: "With Smoothing",
        method: function (params) {
            return colorUtilitiesMethod.getGrayScaleColorString(Math.floor(params.smoothColor * 255 / params.Iiteration));
        }
    },
    something_beautiful: {
        text: "Something Beautiful",
        method: function (params) {
            params.smoothColor /= params.Iiteration;
            return colorUtilitiesMethod.HSVtoRGB(.45 + 10 * params.smoothColor, .8, .9);
        }

    },
    surprise_me: {
        text: "Surprise Me!",
        init: function() {
            this.randomNumbers = colorUtilitiesMethod.generateRandomForSurpiseMe();
            console.log(JSON.stringify(this.randomNumbers));
        },  
        method: function (params) {
            params.smoothColor /= params.Iiteration;
            return colorUtilitiesMethod.HSVtoRGB(this.randomNumbers.h1 + this.randomNumbers.h2 * params.smoothColor, .8, this.randomNumbers.v);
        }
    }

}

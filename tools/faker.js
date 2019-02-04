module.exports = {

    getFirstName: () => {
        let text = "";
        let possible = "چجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظآژپ";

        let array = ["امیر", "حسن", "غلام", "زهرا", "پریا", "محمد", "علی", "فاطمه", "زیبا", "سید بیژن",
            "صبا" , "بابک", "شیرین", "سوگند", "فریبا", "حمید", "عطابک", "رویا"];


        // for (let i = 0; i < 6; i++)
        //     text += possible.charAt(Math.floor(Math.random() * possible.length));

        text = array[(Math.floor(Math.random() * array.length))];

        return text;
    },

    getLastName: () => {

        let text = "";

        let array = ["حمزه", "اعتدادی", "مجتهدی", "زیبا کناری", "پورباقری", "نجفی", "کاسپور", "محمدی",
            "غلام زاده", "منتظری", "آزاده" , "قریبی", "جوینده", "حیدری", "یزدانی", "پاینده", "قنبری", "قربانی",
            "نوازنده"];

        text = array[(Math.floor(Math.random() * array.length))];

        return text;
    },

    getPhoneNumber: () => {

        let phone = "093";
        let numbers = "0123456789";

        for (let i = 0; i < 8; i++)
            phone += numbers.charAt(Math.floor(Math.random() * numbers.length));

        return phone;
    },

    getField: () => {

        let text = "";

        let array = ["تجربی", "ریاضی", "انسانی", "هنر"];

        text = array[(Math.floor(Math.random() * array.length))];

        return text;
    },

    getGrade: () => {

        let text = "";

        let array = ["دهم", "یازدهم", "دوازدهم", "فارغ التحصیل"];

        text = array[(Math.floor(Math.random() * array.length))];

        return text;
    },

};
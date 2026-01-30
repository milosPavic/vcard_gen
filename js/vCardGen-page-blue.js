window.onload = function() {
    let vcard = null
        , qrcode_obj = null
        , qrcode_obj_svg = null
        , qrcode_obj_svg_dot = null
        , qrcode_dv = null
        , qrcode_svg_dv = null
        , qrcode_svg_dots_dv = null
        , form_vCard = null
        , form_url = null
        , btn_vcard = null
        , btn_svg = null
        , firstName = ""
        , lastName = ""
        , action_buttons = null;
    (document.querySelectorAll(".vCardGen_button_import") || []).forEach(function(item, index) {
        item.addEventListener("click", function(event) {
            console.log("click_import");
            let shortcode = prompt("Please enter svg shortcode", "");
            let text;
            if (shortcode == null || shortcode == "") {
                text = "User cancelled the prompt.";
            } else {
                if(shortcode_reverse(shortcode.trim())){
                    generateQRCode();
                }
              ;

            }
        })
    }),
    (document.querySelectorAll(".vCardGen_button_generate") || []).forEach(function(item, index) {
        item.addEventListener("click", function(event) {
            console.log("click_generate");
                event.target.dataset.url && event.target.dataset.url == "url" ? generateQRCode_url() : generateQRCode()
        })
    }),
        (document.querySelectorAll(".vCardGen_button_test") || []).forEach(function(item, index) {
            item.addEventListener("click", function(event) {
                console.log("click_test");
                    event.target.dataset.url && event.target.dataset.url == "url" ? test_data_url() : test_data()
            })
        }),
        console.log("Page and all assets are fully loaded."),
        qrcode_svg_dv = document.getElementById("vCardGen_qrcode_svg"),
        form_vCard = document.querySelector("#form_vCard"),
        form_url = document.querySelector("#form_url"),
        btn_vcard = document.getElementById("btn_vcard"),
        btn_svg = document.getElementById("btn_svg"),
        action_buttons = document.querySelector(".vCardGen_actions"),
        console.log("actions", action_buttons),
        btn_vcard.onclick = function() {
            if (vcard) {
                const blob = new Blob([vcard],{
                    type: "text/vcard"
                })
                    , url = URL.createObjectURL(blob)
                    , a = document.createElement("a");
                a.href = url,
                    a.download = `${firstName}_${lastName}.vcf`,
                    a.click(),
                    URL.revokeObjectURL(url)
            }
        }
        ,
        btn_svg.onclick = function() {
            if (qrcode_obj_svg) {
                const svgElement = document.querySelector("#vCardGen_qrcode_svg > svg:first-of-type");
                if (svgElement instanceof Node) {
                    const svgData = new XMLSerializer().serializeToString(svgElement)
                        , blob = new Blob([svgData],{
                        type: "image/svg+xml"
                    })
                        , url = URL.createObjectURL(blob)
                        , a = document.createElement("a");
                    a.href = url,
                        a.download = `${firstName}_${lastName}_qrcode.svg`,
                        a.click(),
                        URL.revokeObjectURL(url)
                } else
                    alert("No SVG available for download")
            }
        }
    ;
    let tabs = document.querySelectorAll(".vCardGen_tab_nav_tab")
        , tab_contents = document.querySelectorAll(".vCardGen_container_tab_stack_tab_content");
    tabs.forEach(function(item) {
        item.onclick = function(event) {
            let tab = event.target.dataset.tab;
            console.log(tab),
                tab == "vCard" ? btn_vcard.classList.remove("hide") : btn_vcard.classList.add("hide"),
                tabs.forEach(function(tab_item) {
                    tab_item.dataset.tab == tab ? tab_item.classList.add("active") : tab_item.classList.remove("active")
                }),
                tab_contents.forEach(function(stack_item) {
                    stack_item.id == tab ? stack_item.classList.add("active") : stack_item.classList.remove("active")
                }),
                reset_form(null)
        }
    });
    function generateQRCode_url() {
        let web = normalizeUrl(sanitize_str(document.getElementById("vCardGen_web").value))
            , erorr_corection_level = document.getElementById("quality_url").value
            , do_validation_num = 1
            , cnt = 0;
        firstName = "qrCode_url",
            lastName = new Date().toLocaleString(),
            isValidCheck(do_validation_num, function() {
                web && !isValidUrl(web) && (cnt++,
                    alert("Invalid url web1:" + web))
            }),
        cnt == 0 && (clear_box(),
            vcard = web,
            qrcode_obj_svg = new AwesomesauceQRCode(qrcode_svg_dv,{
                text: vcard,
                width: 256,
                height: 256,
                correctLevel: eror_level(erorr_corection_level),
                useSVG: !0
            }),
            action_buttons.classList.add("active"))
    }

    function generateQRCode() {
        firstName = sanitize_str(document.getElementById("vc_firstName").value),
            lastName = sanitize_str(document.getElementById("vc_lastName").value);
        let work = sanitize_str(document.getElementById("vc_work_phone").value)
            , mobile = sanitize_str(document.getElementById("vc_mobile_number").value)
            , home = sanitize_str(document.getElementById("vc_home_number").value)
            , email = sanitize_str(document.getElementById("vc_email").value)
            , web1 = normalizeUrl(sanitize_str(document.getElementById("vc_web1").value))
            , web2 = normalizeUrl(sanitize_str(document.getElementById("vc_web2").value))
            , web3 = normalizeUrl(sanitize_str(document.getElementById("vc_web3").value))
            , company = sanitize_str(document.getElementById("vc_company").value)
            , title = sanitize_str(document.getElementById("vc_title").value)
            , address = sanitize_str(document.getElementById("vc_address").value)
            , city = sanitize_str(document.getElementById("vc_city").value)
            , zipcode = sanitize_str(document.getElementById("vc_zipcode").value)
            , state = sanitize_str(document.getElementById("vc_state").value)
            , country = sanitize_str(document.getElementById("vc_country").value)
            , notes = replace_enter(sanitize_str(document.getElementById("vc_notes").value))
            , erorr_corection_level = document.getElementById("vc_quality").value
            , do_validation_num = 1
            , cnt = 0;
        if (isValidCheck(do_validation_num, function() {
            work && !isValidPhoneNumber(work) && (cnt++,
                alert("Please enter a valid WORK number in the correct format eg. (+1-xxx-xxx-xxxx)."))
        }),
            isValidCheck(do_validation_num, function() {
                mobile && !isValidPhoneNumber(mobile) && (cnt++,
                    alert("Please enter a valid MOBILE number in the correct format eg. (+1-xxx-xxx-xxxx)."))
            }),
            isValidCheck(do_validation_num, function() {
                home && !isValidPhoneNumber(home) && (cnt++,
                    alert("Please enter a valid HOME number in the correct format eg. (+1-xxx-xxx-xxxx)."))
            }),
            isValidCheck(do_validation_num, function() {
                zipcode && !validateZip(zipcode) && (cnt++,
                    alert("Please enter a valid zip code (5 digits or 9 digits with a hyphen)."))
            }),
            isValidCheck(do_validation_num, function() {
                web1 && !isValidUrl(web1) && (cnt++,
                    alert("Invalid url web1:" + web1))
            }),
            isValidCheck(do_validation_num, function() {
                web2 && !isValidUrl(web2) && (cnt++,
                    alert("Invalid url web2:" + web2))
            }),
            isValidCheck(do_validation_num, function() {
                web3 && !isValidUrl(web3) && (cnt++,
                    alert("Invalid url web2:" + web3))
            }),
            isValidCheck(do_validation_num, function() {
                email && !isValidEmail(email) && (cnt++,
                    alert("Invalid email:" + email))
            }),
        cnt == 0) {
            let _addres = address.length > 0 || city.length > 0 || state.length > 0 || zipcode.length > 0 || country.length > 0 ? `${address};${city};${state};${zipcode};${country}` : ""
                , NAME = firstName.length > 0 || lastName.length > 0 ? `N:${lastName};${firstName}
` : ""
                , FN = firstName.length > 0 || lastName.length > 0 ? `FN:${firstName} ${lastName}
` : ""
                , WORK = work.length > 0 ? `TEL;TYPE=WORK;VOICE;PREF:${work}
` : ""
                , MOB = mobile.length > 0 ? `TEL;TYPE=CELL:${mobile}
` : ""
                , HOME = home.length > 0 ? `TEL;TYPE=HOME;VOICE:${home}
` : ""
                , EMAIL = email.length > 0 ? `EMAIL;WORK;PREF:${email}
` : ""
                , URL1 = web1.length > 0 ? `URL:${web1}
` : ""
                , URL2 = web2.length > 0 ? `URL:${web2}
` : ""
                , URL3 = web3.length > 0 ? `URL:${web3}
` : ""
                , ORG = company.length > 0 ? `ORG:${company}
` : ""
                , TITLE = title.length > 0 ? `TITLE:${title}
` : ""
                , ADDRESS = _addres.length > 0 ? `ADR;TYPE=WORK:;;${_addres}
` : ""
                , NOTE = notes.length > 0 ? `NOTE:${notes}
` : "";
            vcard = `BEGIN:VCARD
VERSION:3.0
${NAME}${FN}${WORK}${MOB}${HOME}${EMAIL}${URL1}${URL2}${URL3}${ORG}${TITLE}${ADDRESS}${NOTE}END:VCARD`,
                clear_box(),
                qrcode_obj_svg = new AwesomesauceQRCode(qrcode_svg_dv,{
                    text: vcard,
                    width: 256,
                    height: 256,
                    correctLevel: eror_level(erorr_corection_level),
                    useSVG: !0
                }),
                action_buttons.classList.add("active")
            // Generate shortcode

            console.log(vcard);
            //let short_code = btoa(short_code_get());
            //console.log(short_code);
        }

    }
    function isValidCheck(do_validation_num, doFun=null, isValidValue=1) {
        do_validation_num == isValidValue && doFun && doFun()
    }
    function isValidPhoneNumber(phoneNumber) {
        return /^(?:\+?\d{1,3}[\s\-\.]?)?(\(?\d{3}\)?[\s\-\.]?)\d{3}[\s\-\.]?\d{4}$/.test(phoneNumber)
    }
    function validateZip(zip) {
        const zipRegex = /^\d{5}(-\d{4})?$/;
        return zipRegex.test(zip);
    }
    function normalizeUrl(str) {
        if (!str || typeof str !== "string") return ""; // <-- safely return null

        str = str.trim();

        // Handle protocol-relative URLs
        if (str.startsWith("//")) {
            return "https:" + str;
        }

        // Add https:// if missing protocol
        if (!/^[a-zA-Z][a-zA-Z0-9+\-.]*:/.test(str)) {
            return "https://" + str;
        }

        return str;
    }
    function clear_all() {
        document.getElementById("vc_firstName").value = "",
            document.getElementById("vc_lastName").value = "",
            document.getElementById("vc_work_phone").value = "",
            document.getElementById("vc_mobile_number").value = "",
            document.getElementById("vc_home_number").value = "",
            document.getElementById("vc_email").value = "",
            document.getElementById("vc_web1").value = "",
            document.getElementById("vc_web2").value = "",
            document.getElementById("vc_web3").value = "",
            document.getElementById("vc_company").value = "",
            document.getElementById("vc_title").value = "",
            document.getElementById("vc_address").value = "",
            document.getElementById("vc_city").value = "",
            document.getElementById("vc_zipcode").value = "",
            document.getElementById("vc_state").value = "",
            document.getElementById("vc_country").value = "",
            document.getElementById("vc_notes").value = ""
    }
    function test_data() {
        document.getElementById("vc_firstName").value = "John",
            document.getElementById("vc_lastName").value = "Doe",
            document.getElementById("vc_work_phone").value = "+1 (223) 456 7890",
            document.getElementById("vc_mobile_number").value = "+1 (987) 654 3210",
            document.getElementById("vc_home_number").value = "+1 (452) 153 8906",
            document.getElementById("vc_email").value = "john.doe@example.com",
            document.getElementById("vc_web1").value = "https://www.bluepony.com/w1",
            document.getElementById("vc_web2").value = "https://www.bluepony.com/w2",
            document.getElementById("vc_web3").value = "https://www.bluepony.com/w3",
            document.getElementById("vc_company").value = "Doe Enterprises",
            document.getElementById("vc_title").value = "CEO",
            document.getElementById("vc_address").value = "123 Business St.",
            document.getElementById("vc_city").value = "New York",
            document.getElementById("vc_zipcode").value = "10001",
            document.getElementById("vc_state").value = "NY",
            document.getElementById("vc_country").value = "USA",
            document.getElementById("vc_notes").value = "John's vCard test data"
    }
    function test_data_url() {
        document.getElementById("vCardGen_web").value = "https://www.bluepony.com"
    }
    function sanitize_str(input) {
        return input ? (input = input.trim(),
            input) : ""
    }
    function eror_level(level) {
        switch (level) {
            case "L":
                return AwesomesauceQRCode.CorrectLevel.L;
            case "M":
                return AwesomesauceQRCode.CorrectLevel.M;
            case "Q":
                return AwesomesauceQRCode.CorrectLevel.Q;
            case "H":
                return AwesomesauceQRCode.CorrectLevel.H;
            default:
                return AwesomesauceQRCode.CorrectLevel.L
        }
    }
    function reset_form(event) {
        return console.log("Reset"),
        event && event.preventDefault(),
            qrcode_obj = null,
            qrcode_obj_svg = null,
            qrcode_obj_svg_dot = null,
            vcard = null,
            clear_box(),
            form_vCard?.reset(),
            form_url?.reset(),
            !1
    }
    function clear_box() {
        action_buttons.classList.remove("active"),
            console.log("clear_box"),
            qrcode_obj = null,
            qrcode_obj_svg = null,
            qrcode_obj_svg_dot = null,
        qrcode_dv && (qrcode_dv.title = "",
            qrcode_dv.innerHTML = " "),
        qrcode_svg_dv && (qrcode_svg_dv.title = "",
            qrcode_svg_dv.innerHTML = " "),
        qrcode_svg_dots_dv && (qrcode_svg_dots_dv.title = "",
            qrcode_svg_dots_dv.innerHTML = " ")
    }
    function checkFilled(input) {
        input.value.trim() ? input.classList.add("filled") : input.classList.remove("filled")
    }
    function isValidUrl(string) {
        string && string.length > 1 && string.slice(0, 2) == "//" && (string = "http:" + string);
        try {
            var url = new URL(string);
            return !!(url.hostname && url.hostname.match(/^([a-z0-9])(([a-z0-9-]{1,61})?[a-z0-9]{1})?(\.[a-z0-9](([a-z0-9-]{1,61})?[a-z0-9]{1})?)?(\.[a-zA-Z]{2,4})+$/))
        } catch {
            return !1
        }
    }
    function isValidUrl2(string) {
        try {
            let url = new URL(string);
            return console.log(url),
                !0
        } catch {
            return !1
        }
    }
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    function short_code_get(){
        let sh="";
        sh += firstName.length > 0 ? "fn|" + firstName + ";" : "";
        sh += lastName.length > 0 ? "ln|" + lastName + ";" : "";
        sh += work.length > 0 ? "wo|" + work + ";" : "";
        sh += mobile.length > 0 ? "mo|" + mobile + ";" : "";
        sh += home.length > 0 ? "ho|" + home + ";" : "";
        sh += email.length > 0 ? "em|" + email + ";" : "";
        sh += web1.length > 0 ? "w1|" + web1 + ";" : "";
        sh += web2.length > 0 ? "w2|" + web2 + ";" : "";
        sh += web3.length > 0 ? "w3|" + web3 + ";" : "";
        sh += company.length > 0 ? "cm|" + company + ";" : "";
        sh += title.length > 0 ? "ti|" + title + ";" : "";
        sh += address.length > 0 ? "ad|" + address + ";" : "";
        sh += city.length > 0 ? "ci|" + city + ";" : "";
        sh += zipcode.length > 0 ? "zp|" + zipcode + ";" : "";
        sh += state.length > 0 ? "st|" + state + ";" : "";
        sh += country.length > 0 ? "co|" + country + ";" : "";
        sh += notes.length > 0 ? "nt|" + notes + ";" : "";
        sh += uuid_code.length > 0 ? "uu|" + uuid_code + ";" : "";
        return sh;
    }
    function shortcode_reverse(short_code) {
        clear_all();
        clear_box();
        // Map of field IDs to form elements
        console.log("shortcode_reverse");
        const fieldMap = {
            fn: "#vc_firstName",
            ln: "#vc_lastName",
            wo: "#vc_work_phone",
            mo: "#vc_mobile_number",
            ho: "#vc_home_number",
            em: "#vc_email",
            w1: "#vc_web1",
            w2: "#vc_web2",
            w3: "#vc_web3",
            cm: "#vc_company",
            ti: "#vc_title",
            ad: "#vc_address",
            ci: "#vc_city",
            zp: "#vc_zipcode",
            st: "#vc_state",
            co: "#vc_country",
            nt: "#vc_notes"
        };
        try {
            short_code=atob(short_code);
        } catch (error) {
            console.log(error);
           alert("invalid svg shortcode");
           return false;
        }
        // Split the shortcode by ';' and loop through each key-value pair
        let short_code_split=short_code.split(';');
        if(short_code_split.length>0){
            short_code_split.forEach(field => {
                let [key, value] = field.split('|');
                if (fieldMap[key]) {
                    if(key=='nt'){
                        value = replace_enter(value, true);
                    }
                    // Set the value of the corresponding form field if the key exists in the map
                    document.querySelector(fieldMap[key]).value = value;
                } else {
                    // Log a message if the key does not exist in the fieldMap
                    console.warn(`Field "${key}" not found in the form.`);
                }
            });
        }
        return true;
    }

    function replace_enter(data, isBackward = false) {

        if (typeof data !== 'string') return data;

        if (isBackward) {
            // vCard → textarea
            return data
                .replace(/\\\\/g, '\\')     // restore escaped backslashes
                .replace(/\\n/g, '\n');
        }

        // textarea → vCard
        return data
            .replace(/\\/g, '\\\\')        // escape backslashes FIRST
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .replace(/\n/g, '\\n');
    }
}
;
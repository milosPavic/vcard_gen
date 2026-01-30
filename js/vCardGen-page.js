
document.addEventListener('DOMContentLoaded',
    function() {
        let qrcode_obj_svg=null;
        let vcard=null;

        let time= Date.now();
        // on input change or input exit render svg
        let vCardGen=document.querySelector(".vCardGen");
        let action_buttons=vCardGen.querySelector(".vCardGen_actions");
        let qrcode_svg_dv = vCardGen.querySelector("#vCardGen_qrcode_svg");
        let error_divs=vCardGen.querySelectorAll(".vCardGen_form div");
        let firstName="";
        let lastName="";
        let work = "";
        let mobile = "";
        let home = "";
        //let other="";
        let email = ""
        let web1 = "";
        let web2 = "";
        let web3 = "";
        let company = "";
        let title = "";
        let address = "";
        let city = "";
        let zipcode = "";
        let state = "";
        let country = "";
        let notes = "";
        let short_code="";
        let uuid_code="";

        vCardGen.querySelector(".btn_vcard").addEventListener("click",function(event) {
            if(vcard){
                const blob = new Blob([vcard], { type: "text/vcard" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${firstName}_${lastName}.vcf`;
                a.click();
                URL.revokeObjectURL(url);
            }
        });
        vCardGen.querySelector(".btn_svg").addEventListener("click",function(event) {
            let blob=svg_get_data();
            if(blob){
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${firstName}_${lastName}_qrcode.svg`;
                a.click();
                URL.revokeObjectURL(url);
            }else{
                alert("No SVG available for download");
            }

        });



        vCardGen.querySelector(".btn_clear_all").addEventListener("click",function(event){
            console.log("clear_all_click");
            clear_all();
        });
        vCardGen.querySelector(".btn_test_data").addEventListener("click",function(event){
            console.log("console_log_click");
            //test_data();
        });
        vCardGen.querySelector(".btn_generate_qr").addEventListener("click",function(event){
            console.log("generate_qr_click");
            qrCode();
        });
        let inputs=vCardGen.querySelectorAll('input');
        (inputs||[]).forEach(function(item,index){
            item.addEventListener("change",function(event){
                qrCode();
            })
        });
        let textArea=vCardGen.querySelector('textarea');
        textArea.addEventListener("change",function(event){
            qrCode();
        });

        const form = document.querySelector(".shopify-product-form");
        if (!form) {
            console.error("The Shopify product update form doesn’t exist, or the class name may have been changed. form.shopify-product-form");

            return; // stop here
        }
        form._id=form.getAttribute('id');

        console.log("XXX form._id:", form._id);

        let ti_svg_code       = get_element_set_form("#svg_code", form._id,true);
        let fi_svg_code_file  = get_element_set_form("#svg_code_file", form._id,true);
        let ti_vcard          = get_element_set_form("#vcard", form._id);
        let ti_firstName      = get_element_set_form("#firstName", form._id);
        let ti_lastName       = get_element_set_form("#lastName", form._id);
        let ti_work_phone     = get_element_set_form("#work_phone", form._id);
        let ti_mobile_number  = get_element_set_form("#mobile_number", form._id);
        let ti_home_number    = get_element_set_form("#home_number", form._id);
        let ti_email          = get_element_set_form("#email", form._id);
        let ti_web1           = get_element_set_form("#web1", form._id);
        let ti_web2           = get_element_set_form("#web2", form._id);
        let ti_web3           = get_element_set_form("#web3", form._id);
        let ti_company        = get_element_set_form("#company", form._id);
        let ti_title          = get_element_set_form("#title", form._id);
        let ti_address        = get_element_set_form("#address", form._id);
        let ti_city           = get_element_set_form("#city", form._id);
        let ti_state          = get_element_set_form("#state", form._id);
        let ti_zipcode        = get_element_set_form("#zipcode", form._id);
        let ti_country        = get_element_set_form("#country", form._id);
        let ti_notes          = get_element_set_form("#notes", form._id);
        let ti_short_code     = get_element_set_form("#short", form._id,true);
        let ti_uuid_code      = get_element_set_form("#uuid", form._id,false);

        function get_element_set_form(id, form_id,isFormIdSet=false){
            let el = vCardGen.querySelector(id);
            if(isFormIdSet){
                if(el) el.setAttribute("form", form_id);
            }
            return el;
        }


        function qrCode(){
            let dt= Date.now() - time;
            if(dt>200){
                time=Date.now();
                console.log("qrCode()");
                clear_box();
                generateQRCode();
            }else{
                console.log("qrCode() skep dt:",dt);
            }


        }
        function generateQRCode() {
            firstName = sanitize_str(ti_firstName.value);
            lastName = sanitize_str(ti_lastName.value);
            work = sanitize_str(ti_work_phone.value);
            mobile = sanitize_str(ti_mobile_number.value);
            home = sanitize_str(ti_home_number.value);
            //let other="";
            email = sanitize_str(ti_email.value);
            web1 = normalizeUrl(sanitize_str(ti_web1.value));
            web2 = normalizeUrl(sanitize_str(ti_web2.value));
            web3 = normalizeUrl(sanitize_str(ti_web3.value));
            company = sanitize_str(ti_company.value);
            title = sanitize_str(ti_title.value);
            address = sanitize_str(ti_address.value);
            city = sanitize_str(ti_city.value);
            zipcode = sanitize_str(ti_zipcode.value);
            state = sanitize_str(ti_state.value);
            country = sanitize_str(ti_country.value);
            notes = replace_enter(sanitize_str(ti_notes.value));
            uuid_code=nanoid();
            short_code=btoa(short_code_get());
            console.log(short_code);

            //let erorr_corection_level = document.getElementById(quality.value);
            //let do_validation_num = parseInt(document.getElementById('vCardGen_ch_validate').value);
            let erorr_corection_level="L";
            let do_validation_num = 1;

            let cnt=0;
            // Validate phone numbers and zip code if entered
            isValidCheck(do_validation_num,function(){
                if (work && !isValidPhoneNumber(work)) {
                    cnt++;
                    ti_work_phone.parentElement.classList.add('invalid');
                    alert('Please enter a valid WORK number in the correct format eg. (+1-xxx-xxx-xxxx).');
                }else{
                    ti_work_phone.parentElement.classList.remove('invalid');
                }
            });
            isValidCheck(do_validation_num,function(){
                if (mobile && !isValidPhoneNumber(mobile)) {
                    cnt++;
                    ti_mobile_number.parentElement.classList.add('invalid');
                    alert('Please enter a valid MOBILE number in the correct format eg. (+1-xxx-xxx-xxxx).');
                }else{
                    ti_mobile_number.parentElement.classList.remove('invalid');
                }
            });
            isValidCheck(do_validation_num,function(){
                if (home && !isValidPhoneNumber(home)) {
                    cnt++;
                    ti_home_number.parentElement.classList.add('invalid');
                    alert('Please enter a valid HOME number in the correct format eg. (+1-xxx-xxx-xxxx).');
                }else{
                    ti_home_number.parentElement.classList.remove('invalid');
                }
            });
            isValidCheck(do_validation_num,function(){
                if (zipcode && !validateZip(zipcode)) {
                    cnt++;
                    ti_zipcode.parentElement.classList.add('invalid');
                    alert('Please enter a valid zip code (5 digits or 9 digits with a hyphen).');
                }else{
                    ti_zipcode.parentElement.classList.remove('invalid');
                }
            });
            isValidCheck(do_validation_num,function(){
                if(web1){ web1=normalizeUrl(web1);}
                if (web1 && !isValidUrl(web1)) {
                    cnt++;
                    ti_web1.parentElement.classList.add('invalid');
                    alert('Invalid url web1:'+web1);
                }else{
                    ti_web1.parentElement.classList.remove('invalid');
                }
            });
            isValidCheck(do_validation_num,function(){
                if(web2){ web2=normalizeUrl(web2);}
                if (web2 && !isValidUrl(web2)) {
                    cnt++;
                    ti_web2.parentElement.classList.add('invalid');
                    alert('Invalid url web2:'+web2);
                }else{
                    ti_web2.parentElement.classList.remove('invalid');
                }
            });
            isValidCheck(do_validation_num,function(){
                if(web3){ web3=normalizeUrl(web3);}
                if (web3 && !isValidUrl(web3)) {
                    cnt++;
                    ti_web3.parentElement.classList.add('invalid');
                    alert('Invalid url web2:'+web3);
                }else{
                    ti_web3.parentElement.classList.remove('invalid');
                }
            });

            isValidCheck(do_validation_num,function(){
                if (email && !isValidEmail(email)) {
                    cnt++;
                    ti_email.parentElement.classList.add('invalid');
                    alert('Invalid email:'+email);
                }else{
                    ti_email.parentElement.classList.remove('invalid');
                }
            });
            isValidCheck(do_validation_num, function () {
                const max = parseInt(ti_notes.getAttribute('maxlength'), 10) || 400;
                const notes = ti_notes.value;

                if (notes && notes.length > max) {
                    cnt++;
                    ti_notes.parentElement.classList.add('invalid');
                    alert('Notes can have max ' + max + ' chars. You entered: ' + notes.length);
                } else {
                    ti_notes.parentElement.classList.remove('invalid');
                }
            });



            if(cnt==0){
                // Create vCard text format
                let _addres=address.length>0 || city.length>0 || state.length>0 || zipcode.length>0 || country.length>0?`${address};${city};${state};${zipcode};${country}`:'';
                let NAME=   firstName.length>0 || lastName.length>0?`N:${lastName};${firstName}\n`:'';
                let FN=     firstName.length>0 || lastName.length>0?`FN:${firstName} ${lastName}\n`:'';
                let WORK=    work.length>0?`TEL;TYPE=WORK;VOICE;PREF:${work}\n`:'';
                let MOB=    mobile.length>0?`TEL;TYPE=CELL:${mobile}\n`:'';
                let HOME=    home.length>0?`TEL;TYPE=HOME;VOICE:${home}\n`:'';
                //let OTHER=  other.length>0?`OTHER:${other}\n`:'';
                let EMAIL=  email.length>0?`EMAIL;WORK;PREF:${email}\n`:"";
                let URL1=   web1.length>0?`URL:${web1}\n`:'';
                let URL2=   web2.length>0?`URL:${web2}\n`:'';
                let URL3=   web3.length>0?`URL:${web3}\n`:'';
                let ORG=    company.length>0?`ORG:${company}\n`:'';
                let TITLE=  title.length>0?`TITLE:${title}\n`:'';
                let ADDRESS=_addres.length>0?`ADR;TYPE=WORK:;;${_addres}\n`:'';
                let NOTE=   notes.length>0?`NOTE:${notes}\n`:'';
                vcard = `BEGIN:VCARD\nVERSION:3.0\n${NAME}${FN}${WORK}${MOB}${HOME}${EMAIL}${URL1}${URL2}${URL3}${ORG}${TITLE}${ADDRESS}${NOTE}END:VCARD`;

                //ti_vcard.value=vcard;
                clear_box();

                // Generate QR code in SVG format
                qrcode_obj_svg = new AwesomesauceQRCode(qrcode_svg_dv, {
                    text: vcard,
                    width: 256,
                    height: 256,
                    correctLevel: eror_level(erorr_corection_level),
                    useSVG: true
                });

                action_buttons.classList.add('active');
                ti_short_code.value=short_code;
                ti_uuid_code.value=uuid_code;
                setTimeout(function(){
                    console.log('input');
                    //ti_svg_code.value=qrcode_svg_dv.innerHTML;
                    let ti_svg_code=document.querySelector("#svg_code");
                    let ti_svg_code_file=document.querySelector("#svg_code_file");
                    let svg_data=svg_get_data(false);
                    //input as code
                    //ti_svg_code.value=svg_data;
                    //input as file
                    svg_data_to_file(svg_data,ti_svg_code_file);
                    //console.log(qrcode_svg_dv.innerHTML)
                },1000)
            }

        }
        function clear_all(){
            //clear errors
            eror_divs_clear()
            //clear all
            ti_vcard.value="";
            ti_svg_code.value="";
            ti_firstName.value="";
            ti_lastName.value="";
            ti_work_phone.value="";
            ti_mobile_number.value="";
            ti_home_number.value="";
            ti_email.value="";
            ti_web1.value="";
            ti_web2.value="";
            ti_web3.value="";
            ti_company.value="";
            ti_title.value="";
            ti_address.value="";
            ti_city.value="";
            ti_zipcode.value="";
            ti_state.value="";
            ti_country.value="";
            ti_notes.value="";
            ti_short_code.value="";
            ti_uuid_code.value="";
            clear_box();
        }
        function clear_box(){
            action_buttons.classList.remove('active');
            console.log('clear_box');
            ti_svg_code="";
            qrcode_obj_svg=null;
            if(qrcode_svg_dv) {
                qrcode_svg_dv.title="";
                qrcode_svg_dv.innerHTML=" ";
            }
        }
        function test_data(){
            //clear errors
            eror_divs_clear()
            // Fill the form with some test data
            ti_svg_code.value="";
            ti_vcard.value="";
            ti_firstName.value="John";
            ti_lastName.value="Doe";
            ti_work_phone.value="+1 (223) 456 7890";
            ti_mobile_number.value="+1 (987) 654 3210";
            ti_home_number.value="+1 (452) 153 8906";
            ti_email.value="email@email.com";
            ti_web1.value="https://www.apollomfg.com";
            ti_web2.value="https://www.apollomfg.com";
            ti_web3.value="https://www.apollomfg.com";
            ti_company.value="Doe Enterprises";
            ti_title.value="CEO";
            ti_address.value="123 Business St.";
            ti_city.value="New York";
            ti_zipcode.value="10001";
            ti_state.value="NY";
            ti_country.value="USA";
            ti_notes.value="John's vCard test data";
            ti_short_code.value="";
            ti_uuid_code.value="";
            generateQRCode();
        }
        function eror_divs_clear(){
            error_divs.forEach(function(item,index){
                item.classList.remove("invalid");
            });
        }
        function sanitize_str(input){
            if(input){
                input=input.trim();
                return input;
            }else{
                return '';
            }
        }
        function isValidCheck(do_validation_num,doFun=null,isValidValue=1){
            if(do_validation_num==isValidValue){
                if(doFun){
                    doFun();
                }
            }
        }
        function isValidPhoneNumber(phoneNumber) {
            const phoneRegex = /^(?:\+?\d{1,3}[\s\-\.]?)?(\(?\d{3}\)?[\s\-\.]?)\d{3}[\s\-\.]?\d{4}$/;
            return phoneRegex.test(phoneNumber);
        }

        // Function to validate US zip code (5 digits or 9 digits with a hyphen)
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

        function isValidUrl(str) {
            try {
                new URL(str);
                return true;
            } catch {
                return false;
            }
        }


        function isValidUrl_00(string) {
            if (string && string.length > 1 && string.slice(0, 2) == '//') {
                string = 'http:' + string; //dummy protocol so that URL works
            }
            try {
                var url = new URL(string);
                return url.hostname && url.hostname.match(/^([a-z0-9])(([a-z0-9-]{1,61})?[a-z0-9]{1})?(\.[a-z0-9](([a-z0-9-]{1,61})?[a-z0-9]{1})?)?(\.[a-zA-Z]{2,4})+$/) ? true : false;
            } catch (_) {
                return false;
            }
        }
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        function eror_level(level){
            switch(level){
                case 'L': return AwesomesauceQRCode.CorrectLevel.L;
                case 'M': return AwesomesauceQRCode.CorrectLevel.M;
                case 'Q': return AwesomesauceQRCode.CorrectLevel.Q;
                case 'H': return AwesomesauceQRCode.CorrectLevel.H;
                default:return AwesomesauceQRCode.CorrectLevel.L;
            }
        }
        function svg_get_data(isBlob=true){
            if(qrcode_obj_svg){
                //const svgElement = document.querySelector("#qrcode-svg");
                const svgElement = document.querySelector("#vCardGen_qrcode_svg > svg:first-of-type");
                if(svgElement instanceof Node){
                    const svgData = new XMLSerializer().serializeToString(svgElement);
                    if(isBlob==false){
                        return svgData;
                    }
                    const blob = new Blob([svgData], { type: "image/svg+xml" });
                    return blob;
                }
            }
            return null;
        }
        function svg_data_to_file(svgData,file_input) {

            let blob = new Blob([svgData], { type: 'image/svg+xml' });
            let file = new File([blob], 'drawing.svg', { type: 'image/svg+xml' });

            let dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            file_input.files = dataTransfer.files;
        }
        function nanoid(size = 21) {
            const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
            const length = alphabet.length;
            let id = '';

            for (let i = 0; i < size; i++) {
                id += alphabet[Math.floor(Math.random() * length)];
            }

            return id;
        }

        function uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0; // Random number between 0 and 15
                var v = (c === 'x') ? r : (r & 0x3 | 0x8); // If 'y', generate 8-11 (for UUID v4)
                return v.toString(16); // Convert to hexadecimal and return
            });
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
            // Map of field IDs to form elements
            const fieldMap = {
                fn: "#firstName",
                ln: "#lastName",
                wo: "#work_phone",
                mo: "#mobile_number",
                ho: "#home_number",
                em: "#email",
                w1: "#web1",
                w2: "#web2",
                w3: "#web3",
                cm: "#company",
                ti: "#title",
                ad: "#address",
                ci: "#city",
                zp: "#zipcode",
                st: "#state",
                co: "#country",
                nt: "#notes"
            };

            // Split the shortcode by ';' and loop through each key-value pair
            short_code.split(';').forEach(field => {
                let [key, value] = field.split('|');
                if (fieldMap[key]) {
                    // Set the value of the corresponding form field if the key exists in the map
                    if(key=='nt'){
                        //value = replace_enter(value, true);
                    }
                    document.querySelector(fieldMap[key]).value = value;
                } else {
                    // Log a message if the key does not exist in the fieldMap
                    console.warn(`Field "${key}" not found in the form.`);
                }
            });
        }
        function replace_enter(data, isBackward = false) {
            //return data;
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
        //accordion
        const accordionHeaders = document.querySelectorAll('.accordion-header');

        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const isActive = this.classList.contains('active');

                // Toggle active state
                this.classList.toggle('active');
                content.classList.toggle('active');

                // Animate the content
                if (!isActive) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0px';
                }
            });
        });

        // Set initial max-height for default open accordion
        const activeContent = document.querySelector('.accordion-content.active');
        if (activeContent) {
            activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
        }


    });
//end window.onload
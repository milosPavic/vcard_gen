<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New QR Code Generator Test </title>
    <link  media="all" rel="stylesheet" href="./css/vCardGen.css?rnd=6">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
<div class="vCardGen">
    <div class="vCardGen_tab_nav">
        <button data-tab="vCard" class="vCardGen_tab_nav_tab "><i class="fa-solid fa-address-card"></i> vCard</button>
        <button data-tab="url" class="vCardGen_tab_nav_tab"><i class="fa-solid fa-envelope"></i> Web/URL</button>
        <button data-tab="import" class="vCardGen_tab_nav_tab active"><i class="fa-solid fa-envelope"></i> Import/XLSX</button>
    </div>
    <div class="vCardGen_container">
        <div class="vCardGen_container_tab_stack">
            <div id="vCard" class="vCardGen_container_tab_stack_tab_content">
                <div class="vCard_box">
                    <span class="vCardGen_tip">Enter in your information below to generate your free vCard QR code.</span>
                    <h2>vCard</h2>
                    <form class="vCardGen_form" id="form_vCard">

                        <!-- Accordion 1: You -->
                        <div class="accordion">
                            <button type="button" class="accordion-header active">
                                <i class="fa-solid fa-user"></i> You
                                <i class="fa-solid fa-chevron-down accordion-icon"></i>
                            </button>
                            <div class="accordion-content active">
                                <label for="firstName" class="label_mob">First Name:</label>
                                <div class="input-container vCardGen_fname"><input placeholder="First Name" id="vc_firstName" name="firstName" type="text"></div>
                                <br><label for="lastName" class="label_mob">Last Name:</label>
                                <div class="input-container vCardGen_lname"><input placeholder="Last Name" id="vc_lastName" name="lastName" type="text"></div>
                                <br><label for="work" class="label_mob">Work:</label>
                                <div class="input-container vCardGen_phone"><input placeholder="Work Phone" id="vc_work_phone" name="work_phone" type="tel"></div>
                                <br><label for="mobile" class="label_mob">Mobile:</label>
                                <div class="input-container vCardGen_mobile"><input placeholder="Mobile" id="vc_mobile_number" name="mobile_number" type="tel"></div>
                                <br><label for="home" class="label_mob">Home:</label>
                                <div class="input-container vCardGen_phone"><input placeholder="Home" id="vc_home_number" name="home_number" type="tel"></div>
                                <br><label for="email" class="label_mob">Email:</label>
                                <div class="input-container vCardGen_email"><input placeholder="Email" id="vc_email" name="email" type="email"></div>
                                <br><label for="title" class="label_mob">Title:</label>
                                <div class="input-container vCardGen_title"><input placeholder="Title" id="vc_title" name="title" type="text"></div>
                                <br>
                            </div>
                        </div>

                        <!-- Accordion 2: Your Organization -->
                        <div class="accordion">
                            <button type="button" class="accordion-header">
                                <i class="fa-solid fa-building"></i> Your Organization
                                <i class="fa-solid fa-chevron-down accordion-icon"></i>
                            </button>
                            <div class="accordion-content">
                                <label for="web1" class="label_mob">Web1:</label>
                                <div class="input-container vCardGen_web1"><input placeholder="Web1" id="vc_web1" name="web1" type="url"></div>
                                <br><label for="web2" class="label_mob">Web2:</label>
                                <div class="input-container vCardGen_web2"><input placeholder="Web2" id="vc_web2" name="web2" type="url"></div>
                                <br><label for="web3" class="label_mob">Web3:</label>
                                <div class="input-container vCardGen_web3"><input placeholder="Web3" id="vc_web3" name="web3" type="url"></div>
                                <br><label for="company" class="label_mob">Company:</label>
                                <div class="input-container vCardGen_company"><input placeholder="Company" id="vc_company" name="company" type="text"></div>
                                <br><label for="notes" class="label_note_mobile label_mob">Notes:</label>
                                <div class="box">
                                    <label for="notes" class="label_note">Notes:</label>
                                    <div class="input-container vCardGen_notes"><textarea placeholder="Notes" id="vc_notes" name="notes"></textarea></div>
                                    <br>
                                </div>
                            </div>
                        </div>

                        <!-- Accordion 3: Your Location -->
                        <div class="accordion">
                            <button type="button" class="accordion-header">
                                <i class="fa-solid fa-location-dot"></i> Your Location
                                <i class="fa-solid fa-chevron-down accordion-icon"></i>
                            </button>
                            <div class="accordion-content">
                                <label for="address" class="label_mob">Address:</label>
                                <div class="input-container vCardGen_address"><input placeholder="Address"  id="vc_address" name="address" type="text"></div>
                                <br><label for="city" class="label_mob">City:</label>
                                <div class="input-container vCardGen_city"><input placeholder="City" id="vc_city" name="city" type="text"></div>
                                <br><label for="state" class="label_mob">State:</label>
                                <div class="input-container vCardGen_state"><input placeholder="State" id="vc_state" name="state" type="text"></div>
                                <br><label for="zip" class="label_mob">Zip:</label>
                                <div class="input-container vCardGen_zip"><input placeholder="Zip" id="vc_zipcode" name="zipcode" type="text"></div>
                                <br><label for="country" class="label_mob">Country:</label>
                                <div class="input-container vCardGen_country"><input placeholder="Country" id="vc_country" name="country" type="text" ></div>
                                <br>
                            </div>
                        </div>

                        <label for="country">Error Correction Capability:</label>
                        <div class="input-container vCardGen_error"><select placeholder="" id="vc_quality" name="quality" >
                                <option value="L">L - low (7%)</option>
                                <option value="M">M - medium (15%)</option>
                                <option value="Q">Q - quality (25%)</option>
                                <option value="H">H - high (30%)</option>
                            </select></div>
                        <br><br>
                        <div class="button-container">
                            <button id="reset-button" type="reset">Clear All Fields</button>
                            <button id="test-data-button" class="vCardGen_button_test" type="button">Test Data</button>
                            <button id="generate-qrcode" class="vCardGen_button_generate" type="button">Generate QR <span class="vCardGen_hide_mob">Code</span></button>
                            <button id="import-data-button" class="vCardGen_button_import" type="button"><i class="fa-solid fa-cloud-arrow-down"></i> Import</button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="url" class="vCardGen_container_tab_stack_tab_content">
                <div class="vCard_box">
                    <span class="vCardGen_tip">Enter in your information below to generate your free Web/URL QR code.</span>
                    <h2>Web/URL</h2>
                    <form class="vCardGen_form" id="form_url">
                        <label for="web">Web:</label>
                        <div class="input-container vCardGen_web"><input placeholder="" id="vCardGen_web" type="url"></div>
                        <br><label for="country">Error Correction Capability:</label>
                        <div class="input-container vCardGen_error"><select placeholder="" name="quality" id="quality_url">
                                <option value="L">L - low (7%)</option>
                                <option value="M">M - medium (15%)</option>
                                <option value="Q">Q - quality (25%)</option>
                                <option value="H">H - high (30%)</option>
                            </select></div>
                        <br><br>
                        <div class="button-container">
                            <button id="reset-button" type="reset">Clear All Fields</button> <button id="test-data-button" class="vCardGen_button_test" type="button" data-url="url">Test Data</button> <button id="generate-qrcode" class="vCardGen_button_generate" type="button" data-url="url">Generate QR <span class="vCardGen_hide_mob">Code</span></button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="import" class="vCardGen_container_tab_stack_tab_content active">
                <h2>Import data from Excel files</h2>
                <form method="POST" enctype="multipart/form-data" onsubmit="on_submit_excel()">
                    <input type="file" name="excel_file" accept=".xlsx, .xls, .csv" required>
                    <button type="submit">Učitaj i prikaži</button>
                </form>
                <hr>
                <div class=""><button id="btn_download_all">Download All</button></div>
                <h3>Data result</h3>
                <div class="data_result">

                </div>
            </div>
        </div>
        <div class="vCardGen_qrCode_box">
            <div class="qrcode-svg-box">
                <h2>QR Code SVG Preview</h2>
                <div class="vCardGen_parent">
                    <div id="vCardGen_qrcode_svg"></div>
                </div>
            </div>
            <div class="vCardGen_actions">
                <h3 class="vCardGen_left_align">Download as:</h3>
                <div class="button-container vCardGen_action_buttons">
                    <button id="btn_vcard">vCard</button> <button id="btn_svg">SVG</button>
                </div>
            </div>
            <br>
        </div>
    </div>
</div>
<script src="./js/vCardGen-page-blue.js"></script>
<script src="./js/vCardGen-qr-library.js"></script>
<script src="./js/vCardGen-qr-code-styling.js"></script>
<script>
    // Accordion functionality
    function on_submit_excel() {
        const form = event.target;
        const formData = new FormData(form);

        fetch('php/ajax.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.querySelector('.data_result');
            if (data.error) {
                resultContainer.innerHTML = `<p style="color: red;">Error: ${data.error}</p><p>${data.detalji}</p>`;
            } else {
                let tableHTML = '<div class="table-wrapper"><table><thead><tr><th>#</th>';
                data.headers.forEach(header => {
                    tableHTML += `<th>${header}</th>`;
                });
                tableHTML += '</tr></thead><tbody>';
                data.data.forEach((row, index) => {
                    tableHTML += `<tr><td>${index + 1}</td>`;
                    data.headers.forEach(header => {
                        tableHTML += `<td>${row[header] || ''}</td>`;
                    });
                    tableHTML += '</tr>';
                });
                tableHTML += '</tbody></table></div>';
                resultContainer.innerHTML = tableHTML;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        event.preventDefault();
    }
    document.addEventListener('DOMContentLoaded', function() {
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
</script>

</body>
</html>

function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('active');
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// submit zip pdf ... this gonna be REMOOOOOVED 
document.addEventListener("DOMContentLoaded", function () {
    const fileTypeRadios = document.querySelectorAll('input[name="file-type"]');
    const fileUploadSection = document.getElementById('file-upload-section');
    const fileInput = document.getElementById('course-file');
    const uploadLabel = document.getElementById('upload-label');

    const semesterRadios = document.querySelectorAll('input[name="semester"]');
    const courseTypeSection = document.getElementById('course-type-section');

    // Show file upload when a file type is selected
    fileTypeRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            fileUploadSection.style.display = "flex";
            if (this.value === "pdf") {
                uploadLabel.innerText = "Upload PDF";
                fileInput.accept = "application/pdf";
            } else {
                uploadLabel.innerText = "Upload ZIP";
                fileInput.accept = "application/zip";
            }
        });
    });

    // Show course type selection when a semester is chosen
    semesterRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            courseTypeSection.style.display = "flex";
        });
    });

    // Handle form submission
    document.getElementById("course-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("course-name").value;
        const description = document.getElementById("course-description").value;
        const file = document.getElementById("course-file").files[0];
        const semester = document.querySelector('input[name="semester"]:checked');
        const courseType = document.querySelector('input[name="course-type"]:checked');

        if (name && description && file && semester && courseType) {
            const fileURL = URL.createObjectURL(file);

            // **Find the correct target section dynamically**
            const targetId = `${semester.value}-${courseType.value}`; // Example: "S1-Cours"
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${name}</strong>: ${description} - 
                <a href="${fileURL}" target="_blank">Download ${file.type.includes('pdf') ? 'PDF' : 'ZIP'}</a>`;
                
                targetSection.appendChild(listItem); // Add file to the correct section
            } else {
                // alert(`Error: Section "${targetId}" not found.`); later
            }

            // Reset form & hide sections after submission
            document.getElementById("course-form").reset();
            fileUploadSection.style.display = "none";
            courseTypeSection.style.display = "none";

            // showNotification(`"${file.name}" uploaded successfully!`); later
            showNotification(`Sorry Back End doesn t work for now...!`);
        }
    });
});

// *********************

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.opacity = 1;
    }, 0);
    setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 3000);
}

// courses
document.querySelectorAll('input[name="course"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        const selectedCourse = this.value;
        const courseList = document.getElementById('course-list');
        const subCourseSection = document.getElementById('sub-course');
        
        // Show sub-course options
        subCourseSection.style.display = 'block';
        
        // Clear previous course list
        courseList.innerHTML = '';

        // Remove sub-course list when a new course is selected
        document.querySelectorAll('input[name="sub-course"]').forEach(radio => radio.checked = false);

        // Clear PDFs and set course-specific options
        const pdfs = fetchPDFs(selectedCourse);
        
        // Display the PDFs
        // pdfs.forEach(pdf => {
        //     const listItem = document.createElement('li');
        //     const pdfLink = document.createElement('a');
        //     pdfLink.href = pdf.path;
        //     pdfLink.target = "_blank";
        //     pdfLink.innerHTML = `<img class="pdf-icon" src="pdf.png" alt="PDF Icon"> ${pdf.name}`;
        //     listItem.appendChild(pdfLink);
        //     courseList.appendChild(listItem);
        // });
    });
});

// Handle sub-course selection (Cours, TD, TP)
document.querySelectorAll('input[name="sub-course"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        const selectedSubCourse = this.value;
        const selectedCourse = document.querySelector('input[name="course"]:checked').value;
        const courseList = document.getElementById('course-list');
        
        courseList.innerHTML = ''; // Clear previous course list

        // Fetch the PDFs for the selected sub-course
        const pdfs = fetchSubCoursePDFs(selectedCourse, selectedSubCourse);

        // Display the PDFs
        pdfs.forEach(pdf => {
            const listItem = document.createElement('li');
            const pdfLink = document.createElement('a');
            pdfLink.href = pdf.path;
            pdfLink.target = "_blank";
            pdfLink.innerHTML = `<img class="pdf-icon" src="icon.png" alt="PDF Icon"> ${pdf.name}`;
            listItem.appendChild(pdfLink);
            courseList.appendChild(listItem);
        });
    });
});

// Fetch PDFs for the sub-course (Cours, TD, TP)
function fetchSubCoursePDFs(course, subCourse) {
    const pdfs = [];
    const courseFolder = `courses/${course}/${subCourse}/`; 
    if (course === "S1" && subCourse === "Cours") {
        pdfs.push({ name: "S1 Cours - BD SI 1", path: `${courseFolder}1.pdf` });
        pdfs.push({ name: "S1 Cours - BD SI 2", path: `${courseFolder}2.pdf` });
        pdfs.push({ name: "S1 Cours - BD SQL 1", path: `${courseFolder}3.pdf` });
        pdfs.push({ name: "S1 Cours - BD SQL 2", path: `${courseFolder}4.pdf` });
        pdfs.push({ name: "S1 Cours - BD SQL 3", path: `${courseFolder}5.pdf` });
        pdfs.push({ name: "S1 Cours - RESEAU 1", path: `${courseFolder}6.pdf` });
        pdfs.push({ name: "S1 Cours - RESEAU 2", path: `${courseFolder}7.pdf` });
        pdfs.push({ name: "S1 Cours - REASEAU 3", path: `${courseFolder}8.pdf` });
        pdfs.push({ name: "S1 Cours - RESEAU 4", path: `${courseFolder}9.pdf` });
        pdfs.push({ name: "S1 Cours - REASEAU 5", path: `${courseFolder}10.pdf` });
        pdfs.push({ name: "S1 Cours - REASEAU 6", path: `${courseFolder}11.pdf` });
        pdfs.push({ name: "S1 Cours - Cpp", path: `${courseFolder}12.pdf` });
        pdfs.push({ name: "S1 Cours - SE Linux", path: `${courseFolder}13.pdf` });
        pdfs.push({ name: "S1 Cours - SE Linux cmds", path: `${courseFolder}14.pdf` });
        pdfs.push({ name: "S1 Cours - SE 1", path: `${courseFolder}15.pdf` });
        pdfs.push({ name: "S1 Cours - SE 2", path: `${courseFolder}16.pdf` });
        pdfs.push({ name: "S1 Cours - SE 3", path: `${courseFolder}17.pdf` });
        pdfs.push({ name: "S1 Cours - SE 4", path: `${courseFolder}18.pdf` });
        pdfs.push({ name: "S1 Cours - Algebre SVD -> ACP", path: `${courseFolder}19.pdf` });
    } else if (course === "S1" && subCourse === "TD") {
        pdfs.push({ name: "S1 TD - BD 1", path: `${courseFolder}1.pdf` });
        pdfs.push({ name: "S1 TD - BD 2", path: `${courseFolder}2.pdf` });
        pdfs.push({ name: "S1 TD - BD 3", path: `${courseFolder}3.pdf` });
        pdfs.push({ name: "S1 TD - BD 4", path: `${courseFolder}4.pdf` });
        pdfs.push({ name: "S1 TD - BD (exams)", path: `${courseFolder}5.zip` });
        pdfs.push({ name: "S1 TD - RESEAU", path: `${courseFolder}5.pdf` });
        pdfs.push({ name: "S1 TD - RESEAU (exams)", path: `${courseFolder}6.zip` });
        pdfs.push({ name: "S1 TD - Algebre TD + TP 1", path: `${courseFolder}7.pdf` });
        pdfs.push({ name: "S1 TD - Algebre TD + TP 2", path: `${courseFolder}8.pdf` });
        pdfs.push({ name: "S1 TD - Algebre TD + TP 3", path: `${courseFolder}9.pdf` });
        pdfs.push({ name: "S1 TD - Algebre TD + TP 4", path: `${courseFolder}10.pdf` });
        pdfs.push({ name: "S1 TD - Algebre TD + TP 5", path: `${courseFolder}11.pdf` });
        pdfs.push({ name: "S1 TD - EXAMS A", path: `${courseFolder}exams 1.zip` });
        pdfs.push({ name: "S1 TD - EXAMS B", path: `${courseFolder}exams 2.zip` });
    } else if (course === "S1" && subCourse === "TP") {
        pdfs.push({ name: "S1 TP - RESEAU", path: `${courseFolder}1.pdf` });
        pdfs.push({ name: "S1 TP - Cpp", path: `${courseFolder}2.pdf` });
        pdfs.push({ name: "S1 TP - Cpp", path: `${courseFolder}3.pdf` });
        pdfs.push({ name: "S1 TP - Cpp", path: `${courseFolder}4.pdf` });
        pdfs.push({ name: "S1 TP - SE", path: `${courseFolder}5.zip` });
    }else if (course === "S2" && subCourse === "Cours") {
        pdfs.push({ name: "S2  - Reseau sans Fil 1", path: "https://docs.google.com/uc?export=download&id=1gBgPtxc-BUqofAeXzWo3vpqi1-lIZv5E" });
        pdfs.push({ name: "S2  - Reseau sans Fil 2", path: "https://docs.google.com/uc?export=download&id=1PLxuE9mCXidVJvO36-tX88Ei4NXFFgAB" });
        pdfs.push({ name: "S2  - RESEAU AVANCE TCP/IP 1", path: "https://drive.google.com/uc?export=download&id=1IInP06OEl71pjSkr5gs5Cu5QblEoPqlx" });
        pdfs.push({ name: "S2  - DIGITAL EXCEL AVANCE 1", path: "https://docs.google.com/presentation/d/1DHWYiH4s4MhNs60rNyhn920HWiGQnQvi/export/pptx" });
        pdfs.push({ name: "S2  - DIGITAL EXCEL AVANCE 2", path: "https://docs.google.com/uc?export=download&id=1-SiUA2MT2g_Bb6WoZQ2J3iKzfw882S4k" });
        pdfs.push({ name: "S2  - MATH CYBER 1", path: "https://drive.google.com/uc?export=download&id=11hIe7FYg1gT9IIWya_S_DO_fp93i_qrv" });
        pdfs.push({ name: "S2  - MATH CYBER 2", path: "https://drive.google.com/uc?export=download&id=10sJYMvpbhXcFAyL8Op2tAEQIg1NcuZgT" });
        pdfs.push({ name: "S2  - MATH CYBER 3", path: "https://drive.google.com/uc?export=download&id=1SNp7V-R9COdGXxWAkZ02Mrxn8WW9ByiL" });
        pdfs.push({ name: "S2  - Cybersecurity 1 & 2", path: "https://drive.google.com/uc?export=download&id=1_92jCiiO6AyqfnQLsh4pKFC3_V82BaMf" });
        pdfs.push({ name: "S2  - SEANCE 2 BD AVANCE", path: "https://drive.google.com/uc?export=download&id=1bU8jehdUKzsD1r6KFNwkYWuI8Oty1vUc" });
        pdfs.push({ name: "S2  - SEANCE 3 BD AVANCE", path: "https://drive.google.com/uc?export=download&id=1Vd3LGsz2IQa0ZIVBiNahLXm67AJtopc7" });
    }else if (course === "S2" && subCourse === "TD") {
        pdfs.push({ name: "S2  - RESEAU SANS FILS 1", path: "https://drive.google.com/uc?export=download&id=1R3gGoBbE6Lp4tfE2ICWdMSgga0AhE-eO" });
        pdfs.push({ name: "S2  - RESEAU SANS FILS 2", path: "https://drive.google.com/uc?export=download&id=1rvn6dTKzl5kNOCfQmhMkTrco0xucDAFq" });
        pdfs.push({ name: "S2  - RESEAU AVANCE TCP/IP 1", path: "https://drive.google.com/uc?export=download&id=1hhcfHniz2vWGq5xyGfRjGlfWXBpI6E0j" });
        pdfs.push({ name: "S2  - MATH CYBER 1", path: "https://drive.google.com/uc?export=download&id=1DqccloTgxwoNTWQdzOn6xqkVREadAVvm" });
        pdfs.push({ name: "S2  - Cybersecurity 1", path: "https://drive.google.com/uc?export=download&id=1BitxRTF1HxZSAUN15mGS6KWM62C2XgUU" });
    }else if (course === "S2" && subCourse === "TP") {
        pdfs.push({ name: "S2  - MATH CYBER 0", path: "https://drive.google.com/uc?export=download&id=1p3u14Ab_y14w3pNnhSMHPDP8e1XxmKau" });
        pdfs.push({ name: "S2  - TP Reseaux avance 1  MANET Ad Hoc", path: "https://drive.google.com/uc?export=download&id=1pkxG7Z2jmPD9Mf-Wd4Wjw3lT0_nKM1FX" });
    }else if (course === "S3" && subCourse === "Cours") {
        pdfs.push({ name: "S3  - Pas de cours pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S3" && subCourse === "TD") {
        pdfs.push({ name: "S3  - Pas de tds pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S3" && subCourse === "TP") {
        pdfs.push({ name: "S3  - Pas de tps pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S4" && subCourse === "Cours") {
        pdfs.push({ name: "S4  - Pas de cours pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S4" && subCourse === "TD") {
        pdfs.push({ name: "S4  - Pas de tds pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S4" && subCourse === "TP") {
        pdfs.push({ name: "S4  - Pas de tps pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S5" && subCourse === "Cours") {
        pdfs.push({ name: "S5  - Pas de cours pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S5" && subCourse === "TD") {
        pdfs.push({ name: "S5  - Pas de tds pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S5" && subCourse === "TP") {
        pdfs.push({ name: "S5  - Pas de tps pour le moment", path: `${courseFolder}lab1.pdf` });
    }
    return pdfs;
}

window.onload = function() {
    let updates = [
        "📢 Mise à jour 1 : Nouveau cours,td ajouté en S2.",
        "📢 Mise à jour 2 : TD1 disponibles pour le module Cybersecurity.",
        "📢 Mise à jour 3 : Chap 1&2 disponibles pour le module Cybersecurity.",
    ];

    let messageBox = document.createElement("div");
    messageBox.style.position = "fixed";
    messageBox.style.top = "10px";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translateX(-50%)";
    messageBox.style.backgroundColor = "green";
    messageBox.style.color = "white";
    messageBox.style.padding = "15px 20px";
    messageBox.style.borderRadius = "5px";
    messageBox.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
    messageBox.style.zIndex = "1000";
    messageBox.style.fontFamily = "Arial, sans-serif";
    messageBox.style.fontSize = "18px";
    messageBox.style.textAlign = "left";
    messageBox.style.maxWidth = "400px";
    
    let messageContent = updates.map(update => `<p style="margin: 5px 0;">${update}</p>`).join("");
    messageBox.innerHTML = messageContent;

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 7000); // Disparaît après 7 secondes
};


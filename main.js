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
                alert(`Error: Section "${targetId}" not found.`);
            }

            // Reset form & hide sections after submission
            document.getElementById("course-form").reset();
            fileUploadSection.style.display = "none";
            courseTypeSection.style.display = "none";

            showNotification(`"${file.name}" uploaded successfully!`);
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
        pdfs.forEach(pdf => {
            const listItem = document.createElement('li');
            const pdfLink = document.createElement('a');
            pdfLink.href = pdf.path;
            pdfLink.target = "_blank";
            pdfLink.innerHTML = `<img class="pdf-icon" src="pdf.png" alt="PDF Icon"> ${pdf.name}`;
            listItem.appendChild(pdfLink);
            courseList.appendChild(listItem);
        });
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
        pdfs.push({ name: "S2  - Pas de cours pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S2" && subCourse === "TD") {
        pdfs.push({ name: "S2  - RESAUX SANS FILS TD 1", path: `${courseFolder}1.pdf` });
    }else if (course === "S2" && subCourse === "TP") {
        pdfs.push({ name: "S2  - Pas de tps pour le moment", path: `${courseFolder}lab1.pdf` });
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

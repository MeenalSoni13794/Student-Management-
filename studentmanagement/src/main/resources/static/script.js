// API Base URL
const API_BASE_URL = 'https://student-management-production-0962.up.railway.app/api/students';

// Load students when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    setupForm();
    setupEditForm();
});

// Setup Add Student Form
function setupForm() {
    const form = document.getElementById('studentForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const studentData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            course: document.getElementById('course').value.trim() || null,
            age: document.getElementById('age').value ? parseInt(document.getElementById('age').value) : null
        };

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });

            if (response.ok) {
                const student = await response.json();
                showToast('Student added successfully!', 'success');
                form.reset();
                loadStudents();
            } else {
                const error = await response.text();
                showToast('Error: ' + error, 'error');
            }
        } catch (error) {
            showToast('Error connecting to server: ' + error.message, 'error');
        }
    });
}

// Setup Edit Form
function setupEditForm() {
    const form = document.getElementById('editForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const studentId = document.getElementById('editId').value;
        const studentData = {
            id: parseInt(studentId),
            name: document.getElementById('editName').value.trim(),
            email: document.getElementById('editEmail').value.trim(),
            course: document.getElementById('editCourse').value.trim() || null,
            age: document.getElementById('editAge').value ? parseInt(document.getElementById('editAge').value) : null
        };

        try {
            const response = await fetch(`${API_BASE_URL}/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });

            if (response.ok) {
                showToast('Student updated successfully!', 'success');
                closeEditModal();
                loadStudents();
            } else {
                showToast('Error updating student', 'error');
            }
        } catch (error) {
            showToast('Error connecting to server: ' + error.message, 'error');
        }
    });
}

// Load all students
async function loadStudents() {
    const container = document.getElementById('studentsContainer');
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('emptyState');
    const errorMessage = document.getElementById('errorMessage');

    // Show loading
    loading.style.display = 'block';
    container.innerHTML = '';
    emptyState.style.display = 'none';
    errorMessage.style.display = 'none';

    try {
        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }

        const students = await response.json();
        loading.style.display = 'none';

        if (students.length === 0) {
            emptyState.style.display = 'block';
        } else {
            displayStudents(students);
        }
    } catch (error) {
        loading.style.display = 'none';
        errorMessage.textContent = 'Error loading students: ' + error.message;
        errorMessage.style.display = 'block';
    }
}

// Display students in the grid
function displayStudents(students) {
    const container = document.getElementById('studentsContainer');
    container.innerHTML = '';

    students.forEach(student => {
        const card = createStudentCard(student);
        container.appendChild(card);
    });
}

// Create student card element
function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';

    card.innerHTML = `
        <div class="student-header">
            <div class="student-info">
                <div class="student-name">${escapeHtml(student.name)}</div>
            </div>
            <div class="student-id">ID: ${student.id}</div>
        </div>
        <div class="student-detail">
            <i class="fas fa-envelope"></i>
            <span>${escapeHtml(student.email)}</span>
        </div>
        ${student.course ? `
        <div class="student-detail">
            <i class="fas fa-book"></i>
            <span>${escapeHtml(student.course)}</span>
        </div>
        ` : ''}
        ${student.age ? `
        <div class="student-detail">
            <i class="fas fa-birthday-cake"></i>
            <span>${student.age} years old</span>
        </div>
        ` : ''}
        <div class="student-actions">
            <button class="btn btn-edit" onclick="editStudent(${student.id})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-danger" onclick="deleteStudent(${student.id})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;

    return card;
}

// Edit student
async function editStudent(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch student');
        }

        const student = await response.json();

        // Fill edit form
        document.getElementById('editId').value = student.id;
        document.getElementById('editName').value = student.name;
        document.getElementById('editEmail').value = student.email;
        document.getElementById('editCourse').value = student.course || '';
        document.getElementById('editAge').value = student.age || '';

        // Show modal
        document.getElementById('editModal').style.display = 'flex';
    } catch (error) {
        showToast('Error loading student: ' + error.message, 'error');
    }
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Delete student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('Student deleted successfully!', 'success');
            loadStudents();
        } else {
            showToast('Error deleting student', 'error');
        }
    } catch (error) {
        showToast('Error connecting to server: ' + error.message, 'error');
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}

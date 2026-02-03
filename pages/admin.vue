<template>
  <div class="admin-panel container">
    <h1>CMS Dashboard</h1>

    <div v-if="!isAuthenticated" class="login-form">
      <h2>Admin Login</h2>
      <form @submit.prevent="login">
        <input v-model="password" type="password" placeholder="Password" class="input-field" />
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>

    <div v-else class="dashboard">
      <div class="tabs">
        <button @click="activeTab = 'projects'" :class="{ active: activeTab === 'projects' }">Projects</button>
        <button @click="activeTab = 'experience'" :class="{ active: activeTab === 'experience' }">Experience</button>
      </div>

      <div v-if="activeTab === 'projects'" class="editor-section">
        <h2>Manage Projects</h2>
        <div v-for="(project, index) in localData.projects" :key="index" class="editor-card">
          <div class="card-header">
            <h3>{{ project.title || 'New Project' }}</h3>
            <button @click="removeProject(index)" class="btn-danger">Remove</button>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label>ID</label>
              <input v-model="project.id" class="input-field" />
            </div>
            <div class="form-group">
              <label>Title</label>
              <input v-model="project.title" class="input-field" />
            </div>
            <div class="form-group">
              <label>Link</label>
              <input v-model="project.link" class="input-field" />
            </div>
            <div class="form-group">
              <label>Color</label>
              <input v-model="project.color" type="color" class="input-field" />
            </div>
          </div>

          <div class="form-group">
            <label>Tags (comma separated)</label>
            <input :value="project.tags.join(', ')" @input="updateTags(project, $event.target.value)" class="input-field" />
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label>Description (ES)</label>
              <textarea v-model="project.description.es" class="input-field" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Description (EN)</label>
              <textarea v-model="project.description.en" class="input-field" rows="3"></textarea>
            </div>
          </div>
        </div>
        <button @click="addProject" class="btn btn-secondary">+ Add Project</button>
      </div>

      <div v-if="activeTab === 'experience'" class="editor-section">
        <h2>Manage Experience</h2>
        <div v-for="(job, index) in localData.experience" :key="index" class="editor-card">
           <div class="card-header">
            <h3>{{ job.company || 'New Job' }}</h3>
            <button @click="removeJob(index)" class="btn-danger">Remove</button>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label>ID</label>
              <input v-model="job.id" class="input-field" />
            </div>
            <div class="form-group">
              <label>Role</label>
              <input v-model="job.role" class="input-field" />
            </div>
            <div class="form-group">
              <label>Company</label>
              <input v-model="job.company" class="input-field" />
            </div>
             <div class="form-group">
              <label>Date</label>
              <input v-model="job.date" class="input-field" />
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label>Description (ES)</label>
              <textarea v-model="job.description.es" class="input-field" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Description (EN)</label>
              <textarea v-model="job.description.en" class="input-field" rows="3"></textarea>
            </div>
          </div>
        </div>
        <button @click="addJob" class="btn btn-secondary">+ Add Job</button>
      </div>

      <div class="actions">
        <button @click="saveChanges" class="btn btn-primary btn-lg">Save All Changes</button>
        <p v-if="message" class="message" :class="{ error: isError }">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const password = ref('')
const isAuthenticated = ref(false)
const activeTab = ref('projects')
const message = ref('')
const isError = ref(false)

// Fetch Initial Data
const { data: content, refresh } = await useFetch('/api/content')
const localData = ref(JSON.parse(JSON.stringify(content.value)))

// Login
const login = async () => {
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { password: password.value }
    })
    if (res.token) {
      isAuthenticated.value = true
    }
  } catch (e) {
    alert('Invalid password')
  }
}

// Data Manipulation
const updateTags = (project, val) => {
  project.tags = val.split(',').map(t => t.trim()).filter(Boolean)
}

const addProject = () => {
  localData.value.projects.push({
    id: '', title: '', link: '', color: '#000000', tags: [],
    description: { es: '', en: '' }
  })
}
const removeProject = (index) => localData.value.projects.splice(index, 1)

const addJob = () => {
  localData.value.experience.push({
    id: '', role: '', company: '', date: '',
    description: { es: '', en: '' }
  })
}
const removeJob = (index) => localData.value.experience.splice(index, 1)

// Save
const saveChanges = async () => {
  try {
    await $fetch('/api/content', {
      method: 'POST',
      body: localData.value
    })
    message.value = 'Saved successfully!'
    isError.value = false
    refresh() // Update frontend data
  } catch (e) {
    message.value = 'Error saving data.'
    isError.value = true
  }
}
</script>

<style lang="scss" scoped>
.admin-panel {
  padding-top: 8rem;
  padding-bottom: 4rem;
  max-width: 900px;
}

h1 { margin-bottom: 2rem; }

.login-form {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  
  .input-field {
    width: 100%;
    margin-bottom: 1rem;
  }
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  button {
    background: transparent;
    border: 1px solid var(--text-secondary);
    color: var(--text-secondary);
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    
    &.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: white;
    }
  }
}

.editor-card {
  background: var(--surface-color);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255,255,255,0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  h3 { color: var(--primary-color); }
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
}

.input-field {
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 0.75rem;
  border-radius: 6px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}

.actions {
  position: sticky;
  bottom: 2rem;
  background: var(--bg-color);
  padding: 1rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 50;
}

.message {
  color: #10B981;
  &.error { color: #EF4444; }
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  
  &-primary {
    background: var(--primary-color);
    color: white;
  }
  
  &-secondary {
    background: transparent;
    border: 1px dashed var(--text-secondary);
    color: var(--text-secondary);
    width: 100%;
    
    &:hover {
      border-color: white;
      color: white;
    }
  }
  
  &-danger {
    background: rgba(239, 68, 68, 0.2);
    color: #EF4444;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>

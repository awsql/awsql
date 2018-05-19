<template>
  <div class="container pt-5">
    <h1>AWS Quick Look</h1>
    <b-alert show>
      This is backendless application works directly with AWS APIs. Your credentials will be stored only in your browser.
    </b-alert>
    <b-form @submit="onSubmit">
      <b-form-group label="AWS access key ID:">
        <b-form-input type="text"
                      v-model="loginForm.aws_access_key_id"
                      required
                      placeholder="Enter AWS access key ID">
        </b-form-input>
      </b-form-group>
      <b-form-group label="AWS secret access key:">
        <b-form-input type="text"
                      v-model="loginForm.aws_secret_access_key"
                      required
                      placeholder="Enter AWS secret access key">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <a href="https://github.com/awsql/awsql" class="btn float-right"><span class="fab fa-github"/> GitHub</a>
    </b-form>
  </div>
</template>

<script>
import * as keyValue from '../services/keyValue'
export default {
  data () {
    return {
      loginForm: {
        aws_access_key_id: '',
        aws_secret_access_key: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      keyValue.set('credentials', this.loginForm)
      this.$store.commit('setCredentials', this.loginForm)
    }
  }
}
</script>

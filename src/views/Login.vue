<template>
  <div class="login-wrapper">
    <div>
      <h1>AWS Quick Look</h1>
      <div class="tip">
        This is backendless application works directly with AWS APIs. Your credentials will be stored only in your browser.
      </div>
      <el-form :model="loginForm" ref="loginForm">
        <el-form-item label="AWS access key ID"
                      prop="aws_access_key_id"
                      :rules="[{ required: true, message: 'is required'}]"
        >
          <el-input v-model="loginForm.aws_access_key_id"></el-input>
        </el-form-item>
        <el-form-item label="AWS secret access key"
                      prop="aws_secret_access_key"
                      :rules="[{ required: true, message: 'is required'}]"
        >
          <el-input v-model="loginForm.aws_secret_access_key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">Submit</el-button>
        </el-form-item>
        <!-- Place this tag where you want the button to render. -->
      </el-form>
    </div>
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
    submitForm () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          keyValue.set('credentials', this.loginForm)
          this.$store.commit('setCredentials', this.loginForm)
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  padding-top: 100px;
  padding-left: 100px;
  padding-right: 100px;
}
.tip {
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin: 20px 0;
}
</style>

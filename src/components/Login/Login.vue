<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">Login</h2>
      <form @submit="submitHandler">
        <div class="login-input-container">
          <span class="login-input-icon">
            <v-icon>mdi-account</v-icon>
          </span>
          <input
            class="login-input"
            type="text"
            name="user"
            placeholder=" Usuário"
            :disabled="isSubmitting"
            @change="changeValues"
          />
        </div>
        <div class="login-input-container">
          <span class="login-input-icon">
            <v-icon>mdi-lock</v-icon>
          </span>
          <input
            class="login-input"
            type="password"
            name="pass"
            placeholder=" Senha"
            :disabled="isSubmitting"
            @change="changeValues"
          />
        </div>
        <p :class="isLoginFailed()">Usuário e/ou senha incorretos!</p>
        <br />
        <button class="login-btn" type="submit" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Entrar</span>
          <span v-else>
            <v-icon class="loading-icon-animation">mdi-autorenew</v-icon>
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Authentication from "../../services/Authentication";

export default {
  name: "Login",
  data() {
    return {
      formValues: {
        user: "",
        pass: ""
      },
      isSubmitting: false,
      loginFailed: false
    };
  },
  methods: {
    isLoginFailed() {
      if (this.loginFailed) return "login-failed-alert";
      else return "login-failed-disabled";
    },

    login(user, pass) {
      Authentication.signIn(user, pass, isSuccess => {
        if (isSuccess) this.$router.push("/home");
        else {
          this.loginFailed = true;
          this.isSubmitting = false;
        }
      });
    },

    validateInput(inputName) {
      //validação dos campos
      if (
        this.formValues[inputName] === "" ||
        this.formValues[inputName].length < 6
      )
        return false;
      else return true;
    },

    submitHandler(e) {
      e.preventDefault();
      if (this.validateInput("pass") && this.validateInput("user")) {
        this.loginFailed = false;
        this.isSubmitting = true;
        setTimeout(() => {
          this.login(this.formValues.user, this.formValues.pass);
        }, 2000);
      } else {
        this.loginFailed = true;
      }
    },

    changeValues(e) {
      let name = e.target.name;
      let value = e.target.value;

      this.formValues[name] = value;
    }
  }
};
</script>

<style>
.login-container {
  min-height: 100vh;
  overflow: auto;
  background: #23527c;
}
.login-box {
  border-radius: 3px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background: rgba(245, 245, 245, 0.4);
  width: 433px;
  height: 561px;
}
.login-title {
  color: #ffffff;
  text-align: center;
  font-size: 60px;
  margin-top: 18%;
  margin-bottom: 15%;
}
.login-input-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15%;
}
.login-input-icon {
  padding: 14px;
  background: #fff;
  border-radius: 3px 0 0 3px;
}
.login-input {
  border: none;
  background: #fff;
  border-radius: 0 3px 3px 0;
  width: 70%;
}
.login-failed-disabled {
  opacity: 0;
}
.login-failed-alert {
  text-align: center;
  color: #ff5858;
  font-weight: bold;
}
.login-btn {
  display: block;
  margin: auto;
  margin-top: 30px;
  width: 153px;
  height: 44px;
  border: none;
  border-radius: 3px;
  background: #23527c;
  color: #ffffff;
  font-weight: lighter;
}
.login-btn:disabled {
  opacity: 0.8;
}
.loading-icon-animation {
  animation: loadingSpinner 1s infinite;
}
@media screen and (max-height: 560px) {
  .login-container {
    height: 560px;
  }
}
@keyframes loadingSpinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
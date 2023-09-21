import axios from "axios"
import Swal from "sweetalert2"

export default {
    data: () => ({
        show1: false,
        password: '',
        username: '',
        usernameRules: [
            v => !!v || 'Username is required',
            v => v.length <= 10 || 'Username must be less than 10 characters',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length <= 10 || 'Password must be less than 10 characters',
        ],
        Toast: Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
    }),
    created() {
      this.deleteToken();
    },
    methods: {
      
      async deleteToken() {
        localStorage.removeItem('token')
      },
      async login() {
        if (this.username == '') {
          this.Toast.fire({
            icon: 'warning',
            title: 'Username is required'
          })
          this.username = ''
          this.password = ''
        } else
        if (this.password == '') {
          this.Toast.fire({
            icon: 'warning',
            title: 'Password is required'
          })
          this.username = ''
          this.password = ''
        } else
        await axios.post('auth/token-student/', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          // if (res.data.status_code == 400) {
          //   console.log(res.data.message)
          //   Swal.fire({
          //     icon: 'question',
          //     title: 'Этот пользователь уже на экзамене! Кто ты воин?',
          //     showConfirmButton: false
          //   })
            this.$router.push('/home')
            localStorage.setItem('token', res.data.token)
            this.Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
            }) 
        })
        .catch((err) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Username or password is incorrect'
          })
          this.username = ''
          this.password = ''
          console.log(err)
        })
      }
    }
  }
<template>
<div class="Activate">
</div>
</template>

<script>
import User from '@/assets/utils/models/User'
export default {
  name: "Activate",
  created() {
    var email = ''
    var request_type = "validate"
    User.validate(this.$route.params.activate, this.$route.params.id, request_type, email).then(res => {
      if (res === "true") {
        this.$router.push({
          name: "ShowBlogs"
        })
      } else {
        this.$confirm('Verification codes expire after 5 minutes, If you have create an account, only the code requested for your current address will work.', 'Warning', {
          confirmButtonText: 'Get again',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          request_type = "resend_register"
          User.validate(this.$route.params.activate, this.$route.params.id, request_type, email).then(() => {
            this.$message({
              type: 'success',
              message: 'Send successful!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'cancel'
          });
        });
      }
    })
  }
}
</script>

<template>
    <div></div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    created() {
        console.log(this.$route.query.token);
        // console.log(this.$route.params)
        if (this.$route.query.token){
            console.log(this.$route.query.token);
            this.$store.dispatch("Login", this.$route.query.token).then(() => {
                this.$router.push({path: "/"});
            });
        }else{
            // debugger
            this.$router.push({path: "/"});
        }
    },
};
</script>

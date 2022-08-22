<template>
    <section id="hero" class="hero d-flex align-items-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 d-flex flex-column justify-content-center">
                    <h1 data-aos="fade-up">Selamat Datang di Website BPKAD</h1>
                    <h2 data-aos="fade-up" data-aos-delay="400">We are team of talented designers making websites with
                        Bootstrap</h2>
                </div>
                <div class="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
                    <img :src="heroImg" class="img-fluid" alt="Background">
                </div>
            </div>
        </div>

    </section>
</template>
<script>
import heroImg from "../../assets/images/HeroImg.png"
export default{
    data:() => ({
        heroImg
    })
}
</script>
<style lang="scss" scoped>
.hero {
    width: 100%;
    height: 100vh;
    background: url(../../assets/images/HeroBg.png) top center no-repeat;
    background-size: cover;
    h1 {
        margin: 0;
        font-size: 48px;
        font-weight: 700;
        color: #012970;
    }
    h2 {
        color: #444444;
        margin: 15px 0 0 0;
        font-size: 26px;
    }
    .hero-img {
        text-align: right;
    }

    @media (min-width: 1024px) {
        background-attachment: fixed;
    }

    @media (max-width: 991px) {
        height: auto;
        padding: 120px 0 60px 0;
        .hero-img {
            text-align: center;
            margin-top: 80px;
            img {
                width: 80%;
            }
        }
    }

    @media (max-width: 768px) {
        text-align: center;

        h1 {
            font-size: 32px;
        }

        h2 {
            font-size: 24px;
        }

        .hero-img {
            img {
                width: 100%;
            }
        }
    }
}

</style>
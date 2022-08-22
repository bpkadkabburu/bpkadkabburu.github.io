<template>
    <section id="about" class="about">

        <div class="container" data-aos="fade-up">
            <div class="row gx-0">
                <div class="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                    <div class="content">
                        <h3>Kata Sambutan</h3>
                        <h2 class="text-uppercase">Kepala bpkad</h2>
                        <p>
                            Quisquam vel ut sint cum eos hic dolores aperiam. Sed deserunt et. Inventore et et dolor
                            consequatur itaque ut voluptate sed et. Magnam nam ipsum tenetur suscipit voluptatum nam et
                            est corrupti.
                        </p>
                        <div class="text-center text-lg-start">
                            <a href="#"
                                class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                                <span>Baca Selengkapnya</span>
                                <i class="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                    <img :src="aboutBg" class="img-fluid" alt="Foto Kepala Badan">
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import aboutBg from "../../assets/images/About.jpg"
export default{
    data:() => ({
        aboutBg
    })
}
</script>
<style lang="scss" scoped>
.about {
    .content {
        background-color: #f6f9ff;
        padding: 40px;
    }
    h3 {
        font-size: 14px;
        font-weight: 700;
        color: #4154f1;
        text-transform: uppercase;
    }
    h2 {
        font-size: 24px;
        font-weight: 700;
        color: #012970;
    }
    p {
        margin: 15px 0 30px 0;
        line-height: 24px;
    }

    .btn-read-more {
        line-height: 0;
        padding: 15px 40px;
        border-radius: 4px;
        transition: 0.5s;
        color: #fff;
        background: #4154f1;
        box-shadow: 0px 5px 25px rgba(65, 84, 241, 0.3);
        span {
            font-family: "Nunito", sans-serif;
            font-weight: 600;
            font-size: 16px;
            letter-spacing: 1px;
        }
        i {
            margin-left: 5px;
            font-size: 18px;
            transition: 0.3s;
        }
        &:hover{
            i {
                transform: translateX(5px);
            }
        }
    }
}
</style>
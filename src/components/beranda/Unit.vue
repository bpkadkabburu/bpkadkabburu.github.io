<template>
    <section id="unit-organisasi" class="unit-organisasi">
        <div class="container" data-aos="fade-up">
            <div class="section-header">
                <p>Unit Organisasi</p>
            </div>
            <div class="row">
                <div class="col-lg-3" data-aos="fade-up" data-aos-delay="200">
                    <div class="box">
                        <img :src="BidangAnggaran" class="img-fluid" alt="">
                        <h3>Bidang Anggaran</h3>
                        <p>Eum ad dolor et. Autem aut fugiat debitis voluptatem consequuntur sit. Et veritatis id.</p>
                    </div>
                </div>
                <div class="col-lg-3 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
                    <div class="box">
                        <img :src="BidangBud" class="img-fluid" alt="">
                        <h3>Bidang Perbendaharaan</h3>
                        <p>Repudiandae amet nihil natus in distinctio suscipit id. Doloremque ducimus ea sit non.</p>
                    </div>
                </div>
                <div class="col-lg-3 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="600">
                    <div class="box">
                        <img :src="BidangAkuntansi" class="img-fluid" alt="">
                        <h3>Bidang Akuntansi</h3>
                        <p>Quam rem vitae est autem molestias explicabo debitis sint. Vero aliquid quidem commodi.</p>
                    </div>
                </div>
                <div class="col-lg-3 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="600">
                    <div class="box">
                        <img :src="BidangAset" class="img-fluid" alt="">
                        <h3>Bidang Aset Daerah</h3>
                        <p>Quam rem vitae est autem molestias explicabo debitis sint. Vero aliquid quidem commodi.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.unit-organisasi{
    .box {
        padding: 30px;
        box-shadow: 0px 0 5px rgba(1, 41, 112, 0.08);
        text-align: center;
        transition: 0.3s;
        height: 100%;
        img {
            padding: 30px 50px;
            transition: 0.5s;
            transform: scale(1.1);
        }
        h3 {
            font-size: 24px;
            color: #012970;
            font-weight: 700;
            margin-bottom: 18px;
        }
        &:hover{
            box-shadow: 0px 0 30px rgba(1, 41, 112, 0.08);
            img {
                transform: scale(1);
            }
        }
    }
}
</style>
<script>
import BidangAkuntansi from "../../assets/images/BidangAkuntansi.jpg"
import BidangAnggaran from "../../assets/images/BidangAnggaran.jpg"
import BidangAset from "../../assets/images/BidangAset.jpg"
import BidangBud from "../../assets/images/BidangBud.jpg"
export default{
    data:() => ({
        BidangAkuntansi,
        BidangAnggaran,
        BidangAset,
        BidangBud
    })
}
</script>
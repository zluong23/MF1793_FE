<template>
  <div class="m-dialogform">
    <div class="m-dialogform__container">
      <div class="row0">
        <p class="dialog-title">Thông tin khách hàng</p>
        <button @click="btnCloseDiaLog" class="icon-close">x</button>
      </div>
      <div class="row1">
        <label class="add-modal-makh modal-lb">
          <span> Mã khách hàng <span style="color: red">*</span> </span>
          <input
            type="text"
            class="modal-inp"
            v-model="customer.CustomerCode"
            v-bind:class="{ 'is-invalid': errors.CustomerCode }"
          />
          <div
            class="invalid-feedback"
            style="font-size: 10px; color: red; margin-top: 5px"
          >
            {{ errors.CustomerCode }}
          </div>
        </label>
        <label class="add-modal-makh modal-lb">
          <span> Họ và Tên <span style="color: red">*</span> </span>
          <input
            type="text"
            class="modal-inp__name"
            v-model="customer.FullName"
            v-bind:class="{ 'is-invalid': errors.FullName }"
          />
          <div
            class="invalid-feedback"
            style="font-size: 10px; color: red; margin-top: 5px"
          >
            {{ errors.FullName }}
          </div>
        </label>
        <label class="add-modal-makh modal-lb">
          Ngày sinh
          <input
            type="date"
            class="modal-inp"
            v-model="customer.DateOfBirth"
            style="width: 200px"
          />
        </label>

        <div class="add-modal-gioitinh modal-lb-exc">
          <div class="modal-radio-text">
            <span>Giơi tính</span>
          </div>
          <div class="modal-radio">
            <input
              type="radio"
              name="gioitinh"
              value="Nam"
              class="modal-radio"
              style="width: 20px; height: 20px"
            />
            <label style="margin-left: 5px">Nam</label>
            <input
              type="radio"
              name="gioitinh"
              value="Nữ"
              class="modal-radio"
              style="width: 20px; height: 20px; margin-left: 10px"
            />
            <label style="margin-left: 5px">Nữ</label>
            <input
              type="radio"
              name="gioitinh"
              value="Khác"
              class="modal-radio"
              style="width: 20px; height: 20px; margin-left: 10px"
            />
            <label style="margin-left: 5px">Khác</label>
          </div>
        </div>
      </div>
      <div class="row2">
        <label class="add-modal-sdt modal-lb">
          Số điện thoại
          <input
            type="text"
            class="modal-inp"
            v-model="customer.PhoneNumber"
            v-bind:class="{ 'is-invalid': errors.PhoneNumber }"
            style="width: 415px"
          />
          <div
            class="invalid-feedback"
            style="font-size: 10px; color: red; margin-top: 5px"
          >
            {{ errors.PhoneNumber }}
          </div>
        </label>
        <label class="add-modal-makh modal-lb">
          Số CMTND
          <input type="text" class="modal-inp__CMTND" />
        </label>
        <label class="add-modal-makh modal-lb">
          Ngày cấp
          <input
            type="date"
            class="modal-inp"
            placeholder="dd/mm/yyyy"
            style="width: 200px"
          />
        </label>
      </div>

      <div class="row3">
        <label class="add-modal-email modal-lb">
          Email
          <input type="text" class="modal-inp" />
        </label>
        <label class="add-modal-noicap modal-lb">
          Nơi cấp
          <input type="text" class="modal-inp" />
        </label>
      </div>

      <div class="row4">
        <label class="add-modal-sotienno modal-lb">
          Số tiền nợ
          <input type="text" class="modal-inp" v-model="customer.DebitAmount" />
        </label>
      </div>

      <div class="row5">
        <label class="add-modal-congty modal-lb">
          Công ty
          <m-combobox
            style="width: 850px"
            api="https://cukcuk.manhnv.net/api/v1/customers"
            propText="CompanyName"
            proValue="CustomerId"
            v-model="customer.CompanyName"
          ></m-combobox>
        </label>
      </div>

      <div class="row6">
        <label class="add-modal-diachi modal-lb">
          Địa chỉ
          <input type="text" class="modal-inp" />
        </label>
      </div>
      <div class="row7">
        <button class="btn-huy" @click="btnHuy">Hủy</button>
        <button class="btn-cat" @click="btnCat">Cất</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyDialog",
  computed: {
    formattedDate() {
      return (date) => {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        const formatted = `${day < 10 ? "0" + day : day}/${
          month < 10 ? "0" + month : month
        }/${year}`;
        return formatted;
      };
    },
    formMode: function () {
      if (this.customerInput.CustomerCode) {
        return "edit";
      } else {
        return "add";
      }
    },
    //tham chieu
  },
  props: {
    customerInput: {
      type: Object,
      default: () => {},
      required: false,
    },
    closeDiaLog: {
      type: Function,
      default: () => {},
      required: false,
    },
    openDiaLog2: {
      type: Function,
      default: () => {},
      required: false,
    },
    itemUpdate: {
      type: Object,
      default: null,
    },
  },

  methods: {
    validate() {
      this.errors = {
        FullName: "",
        CustomerCode: "",
        PhoneNumber: "",
      };
      if (!this.customer.FullName) {
        this.errors.FullName = "Không được để trống tên!";
      }
      if (!this.customer.CustomerCode) {
        this.errors.CustomerCode = "Không được để trống mã!";
      }
      if (!this.customer.PhoneNumber) {
        this.errors.PhoneNumber = "Không được để trống số điện thoại!";
      }
    },
    btnCloseDiaLog() {
      this.closeDiaLog();
    },
    btnHuy() {
      this.closeDiaLog();
    },
    btnCat() {
      this.validate();
      if (this.formMode == "add") {
        this.$maxios
          .post("https://cukcuk.manhnv.net/api/v1/customers", this.customer)
          .then((res) => {
            console.log(res);
            const status = res.status;

            let msg = "";
            switch (status) {
              case 201:
                this.$manhemitter.emit(
                  "onShowNotification",
                  "Thêm mới thành công"
                );
                this.closeDiaLog();
                break;
              case 400:
                this.$manhemitter.emit("onShowNotification", "Có lỗi xảy ra");
                break;
              case 500:
                msg = "co loi xay ra";
                alert(msg);
                break;

              default:
                msg = "co loi xay ra";
                alert(msg);
                this.$manhemitter.emit("onShowNotification", "Có lỗi xảy ra");
                break;
            }
          })
          .catch((error) => {
            console.log(error);
            this.$manhemitter.emit(
              "onShowNotification",
              "Bạn chưa nhập hết thông tin!!!"
            );
          });
      } else if (this.formMode === "edit") {
        this.$maxios
          .put(
            `https://cukcuk.manhnv.net/api/v1/customers/${this.customerInput.CustomerId}`,
            this.customer
          )
          .then((res) => {
            console.log(res);

            this.$manhemitter.emit("onShowNotification", "Cập nhật thành công");
          })
          .catch((error) => {
            console.log(error);
            alert("Có lỗi xảy ra khi cập nhật thông tin");
          });
      }
    },
    btnSave() {
      this.closeDiaLog();
    },
  },
  created() {
    this.customerOrigilJSON = JSON.stringify(this.customerInput);
    this.customer = JSON.parse(this.customerOrigilJSON);

    if (this.formMode == "add") {
      this.$maxios
        .get("https://cukcuk.manhnv.net/api/v1/customers/NewCustomerCode")
        .then((res) => {
          this.customer.CustomerCode = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  data() {
    return {
      errors: {
        FullName: "",
        CustomerCode: "",
        PhoneNumber: "",
      },
      customerOrigilJSON: "",
      newCustomerData: "",
      customer: {
        FullName: "",
        CustomerCode: "",
        DateOfBirth: "",
        DebitAmount: "",
        CompanyName: "",
        IdentityPlace: "",
      },
    };
  },
};
</script>
<style>
@import url(../css/layout/main.css);
</style>

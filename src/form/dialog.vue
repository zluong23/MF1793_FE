<template>
  <div class="m-dialogform">
    <div class="m-dialogform__container">
      <div class="row0">
        <p class="dialog-title">Thông tin khách hàng</p>
        <button @click="btnCloseDiaLog" class="icon-close">x</button>
      </div>
      <div class="row1">
        <label class="add-modal-makh modal-lb">
          <!-- Input validate và binding 2 chiều Mã nhân viên  -->
          <span> Mã khách hàng <span style="color: red">*</span> </span>
          <input
           ref="customerCodeInput"
            type="text"
            class="modal-inp"
            v-model="customer.CustomerCode"
            v-bind:class="{ 'is-invalid': errors.CustomerCode }"
          />
          <!-- Hiển thị lỗi đỏ  -->
          <div
            class="invalid-feedback"
            style="font-size: 10px; color: red; margin-top: 5px"
          >
            {{ errors.CustomerCode }}
          </div>
        </label>
        <label class="add-modal-makh modal-lb">
          <!-- Input validate và binding 2 chiều Họ tên nhân viên -->
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

        <!-- Input binding 2 chiều Ngày sinh nhân viên  -->
        <label class="add-modal-makh modal-lb">
          Ngày sinh
          <input
            type="date"
            class="modal-inp"
            v-model="customer.DateOfBirth"
            style="width: 200px; font-family: Roboto, sans-serif"
          />
        </label>
        <div class="modal-radio">
          <!-- Radio button binding 2 chiều Giới tính nhân viên  -->
          <label class="add-modal-makh modal-lb"> Giới tính </label>
          <!--Giới tính nam = 0 -->

          <input
            type="radio"
            name="gioitinh"
            value="0"
            class="modal-radio"
            style="width: 20px; height: 20px"
            v-model="customer.Gender"
          />

          <!-- Giới tính nữ = 1 -->
          <label style="margin-left: 5px">Nam</label>
          <input
            type="radio"
            name="gioitinh"
            value="1"
            class="modal-radio"
            style="width: 20px; height: 20px; margin-left: 10px"
            v-model="customer.Gender"
          />
          <label style="margin-left: 5px">Nữ</label>
          <!-- Giới tính khác = 2 -->

          <input
            type="radio"
            name="gioitinh"
            value="2"
            class="modal-radio"
            style="width: 20px; height: 20px; margin-left: 10px"
            v-model="customer.Gender"
          />
          <label style="margin-left: 5px">Khác</label>
        </div>
      </div>
      <div class="row2">
        <!-- Input binding 2 chiều Số điện thoại nhân viên  -->

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

        <!-- Input binding 2 chiều CMTND nhân viên  -->
        <label class="add-modal-makh modal-lb">
          Số CMTND
          <input type="text" class="modal-inp__CMTND" />
        </label>

        <!-- Input binding 2 chiều Ngày cấp nhân viên  -->
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
        <!-- Input binding 2 chiều Email nhân viên  -->
        <label class="add-modal-email modal-lb">
          Email
          <input type="text" class="modal-inp" v-model="customer.Email" />
        </label>

        <!-- Input binding 2 chiều Nơi cấp nhân viên  -->
        <label class="add-modal-noicap modal-lb">
          Nơi cấp
          <input type="text" class="modal-inp" />
        </label>
      </div>
      <div class="row4">
        <!-- Input binding 2 chiều Số tiền nợ nhân viên  -->
        <label class="add-modal-sotienno modal-lb">
          Số tiền nợ
          <input type="text" class="modal-inp" v-model="customer.DebitAmount" />
        </label>
      </div>
      <div class="row5">
        <!-- Input binding 2 chiều Công ty nhân viên  -->
        <label class="add-modal-congty modal-lb">
          Công ty
          <!-- <m-combobox
            style="width: 850px"
            api="https://cukcuk.manhnv.net/api/v1/customerGroups"
            propText="customersGroupName"
            propValue="customersGroupId"
            v-model="customer.customersGroupId"
          ></m-combobox> -->
          <input type="text" class="modal-inp" v-model="customer.CompanyName" />
        </label>
      </div>
      <div class="row6">
        <!-- Input binding 2 chiều Địa chỉ nhân viên  -->
        <label class="add-modal-diachi modal-lb">
          Địa chỉ
          <input type="text" class="modal-inp" v-model="customer.Address" />
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
    // Nếu truyền vào code thì edit còn ngược lại là add
    formMode: function () {
      if (this.customerInput.CustomerCode) {
        return "edit";
      } else {
        return "add";
      }
    },
  },
  props: {
    customerInput: {
      type: Object,
      default: () => {},
      required: false,
    },
    // Đóng form
    closeDiaLog: {
      type: Function,
      default: () => {},
      required: false,
    },
    // Mở form 2
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
  // Hàm validate
  methods: {
    validate() {
      this.errors = {
        FullName: "",
        CustomerCode: "",
        PhoneNumber: "",
      };

      // Không được để trống tên
      if (!this.customer.FullName) {
        this.errors.FullName = "Không được để trống tên!";
      }

      // Không được để trống mã
      if (!this.customer.CustomerCode) {
        this.errors.CustomerCode = "Không được để trống mã!";
      }
      // Không được để trống số điện thoại
      if (!this.customer.PhoneNumber) {
        this.errors.PhoneNumber = "Không được để trống số điện thoại!";
      }
    },

    // đóng form
    btnCloseDiaLog() {
      this.closeDiaLog();
    },

    // nút hủy để đóng form
    btnHuy() {
      this.closeDiaLog();
    },

    // nút cat để thêm hoặc edit
    btnCat() {
     
     

      // nếu là add
      if (this.formMode == "add") {
         // truyền hàm validate vào
        this.validate();
        // lấy ra API Post
        this.$maxios
          .post("https://cukcuk.manhnv.net/api/v1/customers", this.customer)
          .then((res) => {
            console.log(res);
            const status = res.status;
            // check lỗi
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
                this.$manhemitter.emit("onShowNotification", "Có lỗi xảy ra");
                break;

              default:
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
            this.type == "hoi";
          });

        // nếu là edit
      } else if (this.formMode === "edit") {
        // update giới tính nam = 0
        if (this.customer.Gender === "0") {
          this.customer.Gender = 0;

          // update giới tính nữ = 1
        } else if (this.customer.Gender === "1") {
          this.customer.Gender = 1;

          // update giới tính nữ = 2
        } else if (this.customer.Gender === "2") {
          this.customer.Gender = 2;
        }

        // Lấy API để Put
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
  },
  created() {
    this.customerOrigilJSON = JSON.stringify(this.customerInput);
    this.customer = JSON.parse(this.customerOrigilJSON);
    if (this.customer.Gender === "0") {
      this.customer.Gender = "0";
    } else if (this.customer.Gender === "1") {
      this.customer.Gender = "1";
    } else if (this.customer.Gender === "2") {
      this.customer.Gender = "2";
    }

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
        CustomerId: "",
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

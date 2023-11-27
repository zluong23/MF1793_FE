<template>
  <main>
    <div class="body-top">
      <p>Trang chủ</p>
    </div>
    <div class="body-table">
      <div class="table__nav">
        <div>
          <span class="table__nav--select"> <strong></strong></span>
          <span class="table__nav--cancel-select"></span>
          <button class="table__nav--delete-all">
            <span class="material-symbols-outlined icon"> </span>
            <span></span>
          </button>
        </div>
        <div>
          <button class="btn-cat" @click="btnOnShowDiaLog">Thêm mới</button>
        </div>
      </div>
      <div class="table__main">
        <!-- Bảng nhân viên -->
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" style="height: 24px; width: 24px" />
              </th>
              <th style="text-align: left">Mã nhân viên</th>
              <th style="text-align: left">Họ tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th style="text-align: right">Tiền nợ</th>
              <th>Số điện thoại</th>
              <th>Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            <!-- Thêm dữ liệu từ API vào -->
            <tr v-for="cus in customers" :key="cus.CustomerCode">
              <td>
                <input type="checkbox" style="height: 24px; width: 24px" />
              </td>
              <td style="text-align: left">{{ cus.CustomerCode }}</td>
              <td style="text-align: left" class="staff-fullname">
                {{ cus.FullName }}
              </td>
              <td style="padding-left: 20px">{{ cus.Gender }}</td>
              <td>{{ formattedDate(cus.DateOfBirth) }}</td>

              <td style="text-align: right">
                {{ formatCurrency(cus.DebitAmount) }}
              </td>
              <td style="">{{ cus.PhoneNumber }}</td>

              <td class="edit-button">
                <button class="edit-icon" @click="onRow(cus)"></button>
                <button
                  class="edit-icon__delete"
                  @click="btnXoa(cus.CustomerId)"
                ></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table__footer">
        <div class="table__footer--left">
          <span>Tổng: <strong>100</strong></span>
        </div>
      </div>
    </div>
    <!-- Dialog form thêm sửa xóa nhân viên -->
    <TheDialog
      v-if="isShowDialog"
      :closeDiaLog="oncloseDiaLog"
      :customerInput="customersUpdate"
    >
    </TheDialog>
  </main>
</template>
<script>
import TheDialog from "./dialog.vue";

export default {
  name: "TheBody",
  components: {
    TheDialog,
  },
  //  hàm chuyển kiểu dữ liệu date
  computed: {
    formattedDate() {
      return (date) => {
        const dateObj = new Date(date);
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return dateObj.toLocaleDateString("en-GB", options);
      };
    },
  },

  // Hàm xóa nhân viên theo Id
  methods: {
    btnXoa(CustomerId) {
      this.$maxios
        .delete(`https://cukcuk.manhnv.net/api/v1/customers/${CustomerId}`)
        .then((res) => {
          console.log(res);
          const status = res.status;
          switch (status) {
            case 200:
              this.$manhemitter.emit("onShowNotification", "Xóa thành công");
              break;
            default:
              this.$manhemitter.emit("onShowNotification", "Xóa thất bại!!!");
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

  // Show form nhân viên
    onRow(cus) {
      this.isShowDialog = true;
      this.customersUpdate = cus;
    },
  // Bấm vào icon update hiện  form nhân viên
    clickUpdate(cus) {
      console.log(cus);
      this.isShowDialog = true;
    },
  // Ẩn form nhân viên
    oncloseDiaLog() {
      this.isShowDialog = false;
    },
  //
    btnOnShowDiaLog() {
      this.isShowDialog = true;
      this.customersUpdate = {};
    },
  // hàm chuyển đổi đơn vị tiền tệ VN
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return formatter.format(amount);
    },
  },
  //hàm truyền dữ liệu từ api
  created() {
    this.$maxios
      .get("https://cukcuk.manhnv.net/api/v1/customers")
      .then((res) => {
        console.log(res);
        this.customers = res.data.map((customer) => {
  // chuyển đổi dữ liệu từ dateTime thành date
          const dateObj = new Date(customer.DateOfBirth);
          const formattedDate = `${dateObj.getFullYear()}-${(
            dateObj.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${dateObj
            .getDate()
            .toString()
            .padStart(2, "0")}`;
          return { ...customer, DateOfBirth: formattedDate };
        });
      })
      .catch((error) => {
        console.log(error);
        const response = error.response;
        const status = response.status;
        let msg = "";
        switch (status) {
          case 400:
            break;
          case 401:
            break;
          case 403:
            break;
          case 404:
            // lay ra cau canh bao nay
            msg = "Dia chi truy cap sai ";
            alert(msg);
            break;
        }
      });
  },

  data() {
    return {
      customersUpdate: {},

      customers: {},

      isShowDialog: false,

      customersRow: {},

      isShowDialog2: false,
    };
  },
};
</script>
<style>
@import url(../css/layout/main.css);
</style>

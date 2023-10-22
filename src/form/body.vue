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

              <th></th>
            </tr>
          </thead>
          <tbody>
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
                >
                  X
                </button>
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
    //tham chieu
  },
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

    // ...

    onRow(cus) {
      this.isShowDialog = true;
      this.customersUpdate = cus;
    },
    clickUpdate(cus) {
      console.log(cus);
      this.isShowDialog = true;
    },
    oncloseDiaLog() {
      this.isShowDialog = false;
    },

    btnOnShowDiaLog() {
      this.isShowDialog = true;
      this.customersUpdate = {};
    },

    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return formatter.format(amount);
    },
    // cliclSave(itemSave) {
    //   let index = this.customers.findIndex(
    //     (c) => c.CustomerCode === itemSave.CustomerCode
    //   );
    //   if (index >= 0) {
    //     this.customers.splice(index, 1, itemSave);
    //   } else {
    //     this.customers.push(itemSave);
    //   }
    //   return;
    // },
    // ////////////////////////////////
  },
  //hàm truyền dữ liệu từ api
  created() {
    // fetch("https://cukcuk.manhnv.net/api/v1/customers")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     this.customers = data;
    //   });

    this.$maxios
      .get("https://cukcuk.manhnv.net/api/v1/customers")
      .then((res) => {
        console.log(res);
        this.customers = res.data;
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

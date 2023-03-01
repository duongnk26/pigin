function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }


function subscribe() {
    let emailer = document.getElementById('email').value;
    if (emailer == '') {
        document.getElementById('check-email').innerHTML = 'Vui lòng nhập một email';
        document.getElementById('check-email').style.color = "red";
        setTimeout(
            () => {
                document.getElementById('check-email').innerHTML = '';
            },
            2 * 1000
          );
    } else if (!validateEmail(emailer)) {
        document.getElementById('check-email').innerHTML = 'Vui lòng nhập một email';
        document.getElementById('check-email').style.color = "red";
        setTimeout(
            () => {
                document.getElementById('check-email').innerHTML = '';
            },
            2 * 1000
          );
    } else {
        document.getElementById('check-email').innerHTML = 'Đăng ký thành công!';
        document.getElementById('check-email').style.color = "green";
        document.getElementById('email').value = null;

        setTimeout(
            () => {
                document.getElementById('check-email').innerHTML = '';
            },
            2 * 1000
          );
    }
    return postToGoogle();
  }

  function postToGoogle() {
    //Xử lý lấy dữ liệu các input vào biến tương ứng thông qua ID của input
    var email = $("#email").val();
    //Đoạn giữa này có thể sử dụng để validate dữ liệu 1 lần nữa hoăc... bỏ qua nhé :D

    //Xử lý gửi dữ liệu lên form
    $.ajax({
        //Chỉ định đích gửi dữ liệu đến: là form response đã tạo ở trên
        url: "https://docs.google.com/forms/d/e/1FAIpQLSeOLStCeUldE56yEzpwJT75ZDsUQzvl_HB20pSe6COETLL1Nw/formResponse?",
        //URL lấy từ link đã note ở trên nhé
        data: { //gán các giá trị tương ứng vào các Input name tương ứng đã lấy ở trên
            "entry.778799374": email,
        },
        type: "POST",
        dataType: "jsonp", //các bạn có thể để xml, nhưng khi bật console lên sẽ thấy báo đỏ lòm vì ko cho cross, còn cái này nó vẫn cảnh báo nhưng màu xám thôi, ko đỏ :v
        success: function(d)
    {}, //do đã bảo ở trên là nó ko cho cross đâu, nên khi gửi data xong ko trả về success được, ko cần điền cái này nhé
        error: function(x, y, z) {
            $('#success-msg').show(); //hiện ra cái mess báo thành công khi gửi xong
        }
    });

    return false;
}

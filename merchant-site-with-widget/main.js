$(document).ready(function () {
  $(".item-color").on("click", function () {
    $(".item-color")
      .removeClass("ring hover:ring-gray-200")
      .addClass("hover:ring-gray-200");
    $(this).addClass("ring").removeClass("hover:ring-gray-200");
  });

  $(".product-capacity").on("click", function () {
    $(".product-capacity").removeClass("ring");
    $(this).addClass("ring");
    const updatePrice = Number(
      $(this).find("span").attr("data-price").split(",")[0]
    );

    // Emit event! 🔗
    const updatePriceFormatted = updatePrice * 100;
    window.payInInstalmentsWidget.events.emit("price_update", {
      amount: updatePriceFormatted,
    });
    $("#product-price").html($(this).find("span").attr("data-price"));
  });

  $(".btn-decrement").on("click", function () {
    var now = $(".quantity > div > input").val();
    if ($.isNumeric(now)) {
      if (parseInt(now) - 1 > 0) {
        now--;
      }
      $(".quantity > div > input").val(now);
    } else {
      $(".quantity > div > input").val("1");
    }
  });

  $(".btn-increment").on("click", function () {
    var now = $(".quantity > div > input").val();
    if ($.isNumeric(now)) {
      $(".quantity > div > input").val(parseInt(now) + 1);
    } else {
      $(".quantity > div > input").val("1");
    }
  });
});

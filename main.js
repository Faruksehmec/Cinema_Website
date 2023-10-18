//console.log('baglantı kontrolu')

//1-Tüm Koltukların kapsayıcı container divi çek
//2-container a click eventi ekle

//html tarafından querSeşector ile className üzerinden eleman çekme
const container = document.querySelector(".container");
//html tarafından çekilen elemanın kontrolü
//console.log(container);

const infoText = document.querySelector(".infoText");
//console.log(infoText);

const movieList = document.querySelector("#movie");
//console.log(movieList)

const SeatCount = document.getElementById("count");
//console.log(SeatCount)

const totalAmount = document.getElementById("amount");
//console.log(totalAmount)

const seats = document.querySelectorAll(!".seat:not(.reserved)");
//console.log(seats)

const saveToDatabase = (index) => {
  //console.log('data,index')

  localStorage.setItem("seatsIndex", JSON.stringify(index));

  //Film verisi Kaydı

  localStorage.setItem("movieIndex", JSON.stringify(movieList.selectedIndex));
};

const getFromDatabase = () => {
  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
  //console.log(dbSelectedSeats)

  if (dbSelectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  const dbSelectedMovie=JSON.parse(localStorage.getItem('movieIndex'))
movieList.selectedIndex=dbSelectedMovie

};

const createIndex = () => {
  let allseatsArray = [];

  seats.forEach((seat) => {
    allseatsArray.push(seat);
  });

  //console.log(allseatsArray)

  const allSelectedSeatsArray = [];
 //console.log(getFromDatabase());
  const allSelectedSeats = container.querySelectorAll(".seat.selected");

  allSelectedSeats.forEach((selectedSeatSeat) => {
    allSelectedSeatsArray.push(selectedSeatSeat);
  });
  //console.log(allSelectedSeatsArray)
  const selectedSeatsIndex = allSelectedSeatsArray.map((selectedSeat) => {
    return allseatsArray.indexOf(selectedSeat);
  });
  //console.log(selectedSeatsIndex);

  saveToDatabase(selectedSeatsIndex);
};

const calculateTotal = () => {
  createIndex();
  //console.log('calculate çalıştı')

  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatsCount)

  SeatCount.innerText = selectedSeatsCount;
  //console.log(Count);
  totalAmount.innerText = selectedSeatsCount * movieList.value;
  //console.log(totalAmount)

  if (selectedSeatsCount) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
};
calculateTotal();
container.addEventListener("click", (pointerEvent) => {
  //console.log('container tıklandı')
  //console.log(pointerEvent.target.offsetParent)
  const clickedSeat = pointerEvent.target.offsetParent;

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});

movieList.addEventListener("change", () => {
  calculateTotal();
});

import carbland from "../../public/images/carbland.png";
import car1 from "../../public/images/car1.png";
import car2 from "../../public/images/car1.png";
import car3 from "../../public/images/car1.png";
import car4 from "../../public/images/car1.png";
import car5 from "../../public/images/car1.png";
import car6 from "../../public/images/car1.png";


export const Entry = () => {
  const deals = [
    car= {
      title : "bus",
      image : car1,
      price: "$30k",
      like:"",
      comment:"",
      share:"",
      subscribe:""
    },
     car= {
      title : "totyota",
      image : car2,
      price: "$34k",
      like:"",
      comment:"",
      share:"",
      subscribe:""
    },
     car= {
      title : "sebaru legancy",
      image : car3,
      price: "$60k",
      like:"",
      comment:"",
      share:"",
      subscribe:""
    }, car= {
      title : "volvo xc60",
      image : car4,
      price: "$74k",
      like:"",
      comment:"",
      share:"",
      subscribe:""
    }, product= {
      title : "Genesis G80",
      image : car5,
      price: "$1,20m",
      like:"",
      comment:"",
      share:"",
      subscribe:""
    },
     car= {
      title : "hyudai sonata",
      image : car6,
      price: "$70k",
      like:"",
      comment:"",
      share:"",
      subscribe:""
    },
  ]
  return (
    <div>
        <div>
            <div className={`bg-[url(${carbland})]`}>
              <div className="flex justify-start px-4">
                <h1 className="capitalize font-bold text-3xl font-roboto">unlock the free to experience travel your way</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur libero illum labore doloremque eaque reprehenderit sequi omnis ullam consectetur harum ipsum maiores alias suscipit ea cumque assumenda, facere exercitationem voluptatibus.</p>
                <button>choose car</button>
              </div>
            </div>
            <div>
              {deals.map(deal =>{
                <div className="grid grid-cols-3  gap-x-6 gap-y-3">
                  <h1 className="h-16 w-16">{deal.car.image}</h1>
                  <p>{deal.car.title}</p>
                  <p>{deal.car.price}</p>
                  <div className="flex gap-x-4">
                    <h1>{deal.car.like}</h1>
                    <h1>{deal.car.comment}</h1>
                    <h1>{deal.car.share}</h1>
                    <h1>{deal.car.subscribe}</h1>
                  </div>
                </div>
              })}
            </div>
        </div>
    </div>
  )
}

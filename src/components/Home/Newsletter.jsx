
const Newsletter = () => {
    return (
        <div className="container w-full mx-auto rounded-xl shadow-md p-5 md:flex justify-between items-center gap-6">
         <div className="md:w-1/2">
               <h3 className="text-2xl">Subscribe for Health Tips</h3>
            <p>Join our health community. Get updates on latest medicines, discounts, and expert health tips directly in your inbox</p>
         </div>

     <div className="flex">
        
<input className="input input-bordered w-full" placeholder="Enter your email" type="email" />

        <button className="btn bg-secondary hover:bg-secondary">Subscribe Now</button>
     </div>
        </div>
    );
};

export default Newsletter;
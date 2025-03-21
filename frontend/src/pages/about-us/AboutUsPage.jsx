import React from 'react';
import teamImage from '../../assets/images/about1.png'; // Replace with your team image
import officeImage from '../../assets/images/about2.png'; // Replace with your office image
import customer1 from "../../assets/images/avatar.png"
import customer2 from "../../assets/images/avatar.png"

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#213245] mb-4">
          About <span className="text-[#D5F5F6]">Farweest Tech</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          At Farweest Tech, we specialize in providing high-quality robotics and drone products, ensuring innovation and performance in everything we do. Our goal is to transform how technology serves your needs.
        </p>
      </div>
      
      {/* Image and Text Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10 mb-12">
        
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img src={teamImage} alt="Our Team" className="rounded-lg shadow-lg w-full h-auto" />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold text-[#213245] mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-4">
            We are dedicated to pushing the boundaries of innovation by offering top-notch technology products that meet the highest standards. Our mission is to bring cutting-edge robotics solutions within everyone's reach.
          </p>
          <p className="text-lg text-gray-600">
            Our dedicated team works passionately to ensure every customer receives not just a product, but an experience that enhances their project or venture.
          </p>
        </div>
      </div>
      
      {/* Core Values Section */}
      <div className="my-12">
        <h2 className="text-4xl font-bold text-center text-[#213245] mb-10">
          <span className="underline decoration-4 decoration-[#D5F5F6]">Our Core Values</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Value 1 */}
          <div className="p-6 bg-[#E0F7FA] rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-[#213245] mb-4">Innovation</h3>
            <p className="text-gray-600">
              We constantly strive to innovate and improve, providing the most advanced products and solutions.
            </p>
          </div>
          
          {/* Value 2 */}
          <div className="p-6 bg-[#E0F7FA] rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-[#213245] mb-4">Quality</h3>
            <p className="text-gray-600">
              We prioritize quality in everything we do, ensuring every product meets our strict standards.
            </p>
          </div>
          
          {/* Value 3 */}
          <div className="p-6 bg-[#E0F7FA] rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-[#213245] mb-4">Customer Satisfaction</h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We are committed to delivering excellence in every interaction.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10 my-12">
        
        {/* Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold text-[#213245] mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 mb-4">
            Our talented and dedicated team of professionals are the driving force behind our success. We believe in collaboration, innovation, and delivering high-quality products.
          </p>
          <p className="text-lg text-gray-600">
            With a passion for technology and a commitment to customer satisfaction, our team is ready to serve you.
          </p>
        </div>

        {/* Team Image Section */}
        <div className="lg:w-1/2">
          <img src={officeImage} alt="Our Office" className="rounded-lg shadow-lg w-full h-auto" />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="my-12">
        <h2 className="text-4xl font-bold text-center text-[#213245] mb-10">
          <span className="underline decoration-4 decoration-[#D5F5F6]">What Our Clients Say</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {/* Testimonial 1 */}
          <div className="flex flex-col items-center max-w-sm p-6 rounded-lg shadow-md border border-[#B0E0E6] bg-[#E0F7FA]">
            <img src={customer1} alt="Customer 1" className="w-20 h-20 rounded-full mb-4" />
            <p className="text-lg text-[#213245] font-medium mb-2 text-center">
              "Great products and fast delivery! Highly recommend."
            </p>
            <strong className="text-[#213245]">John D.</strong>
          </div>
          
          {/* Testimonial 2 */}
          <div className="flex flex-col items-center max-w-sm p-6 rounded-lg shadow-md border border-[#B0E0E6] bg-[#E0F7FA]">
            <img src={customer2} alt="Customer 2" className="w-20 h-20 rounded-full mb-4" />
            <p className="text-lg text-[#213245] font-medium mb-2 text-center">
              "Excellent customer service and genuine products!"
            </p>
            <strong className="text-[#213245]">Jane S.</strong>
          </div>
          
          {/* Testimonial 3 */}
          <div className="flex flex-col items-center max-w-sm p-6 rounded-lg shadow-md border border-[#B0E0E6] bg-[#E0F7FA]">
            <img src={customer1} alt="Customer 3" className="w-20 h-20 rounded-full mb-4" />
            <p className="text-lg text-[#213245] font-medium mb-2 text-center">
              "Amazing quality! I'm very happy with my purchase."
            </p>
            <strong className="text-[#213245]">Michael T.</strong>
          </div>
          
          {/* Testimonial 4 */}
          <div className="flex flex-col items-center max-w-sm p-6 rounded-lg shadow-md border border-[#B0E0E6] bg-[#E0F7FA]">
            <img src={customer2} alt="Customer 4" className="w-20 h-20 rounded-full mb-4" />
            <p className="text-lg text-[#213245] font-medium mb-2 text-center">
              "Fast shipping and great support. Highly satisfied!"
            </p>
            <strong className="text-[#213245]">Emma W.</strong>
          </div>
          
          {/* Testimonial 5 */}
          <div className="flex flex-col items-center max-w-sm p-6 rounded-lg shadow-md border border-[#B0E0E6] bg-[#E0F7FA]">
            <img src={customer1} alt="Customer 5" className="w-20 h-20 rounded-full mb-4" />
            <p className="text-lg text-[#213245] font-medium mb-2 text-center">
              "Products are worth the price. Great experience overall."
            </p>
            <strong className="text-[#213245]">Robert K.</strong>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AboutUs;

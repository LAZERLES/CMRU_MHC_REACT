import React from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import BackToHomeButton from '../Button/BackToHomeButton';

const SelectActivity = () => {
  return (
    <UserLayout title="Activity Selection">
      <div className="flex max-w-screen w-full justify-center items-center bg-base-300 h-screen relative overflow-hidden"> 
        <div className='absolute top-5 left-14 w-full h-full bg-cover bg-center overflow-hidden'>
            <BackToHomeButton/>
        </div>
        {/* Activity Selection Section */}
        <div className="flex flex-col items-center justify-center gap-[24px] my-[60px] mx-[50px]">
          <h1 className="text-5xl font-bold py-3 text-center text-primary"> 
            เลือกประเภทกิจกรรมของคุณ
          </h1>
          <p className="text-lg text-center text-gray-500">
          เลือกประเภทกิจกรรมที่ต้องการทำเพื่อพัฒนาสุขภาพจิตในวันนี้ 
          </p>
        </div>

        {/* Activity Selection Section */}
        <div className="flex justify-center items-center gap-10 w-full px-6 py-10">
          {/* Pleasurable Activities */}
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className='px-5 pt-5'>
              <img 
                src="https://img.freepik.com/free-vector/set-scenes-people-doing-activities_24877-62247.jpg?t=st=1734086782~exp=1734090382~hmac=74039282dc3f98f2f4e906d3e2a9229ec8acc6077e76712c2d0811330467a9c7&w=740" 
                alt="Pleasurable Activities" 
                className="rounded-lg object-cover w-full h-96" 
              />
            </figure>
            <div className="card-body items-center">
              <h2 className="card-title text-center text-primary font-semibold">กิจกรรมเพื่อความสุข</h2>
              <p className="text-center text-gray-600">
              กิจกรรมเพื่อความสุข คือ กิจกรรมที่เน้นความสนุกสนาน ผ่อนคลาย และความสุข สร้างความรู้สึกดีและความพึงพอใจได้ทันที
              </p>
              <div className="card-actions justify-center">
                <Link to="/pleasurable-activities">
                  <button className="btn btn-primary">เลือก</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mastery Activities */}
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className='px-5 pt-5'>
              <img 
                src="https://img.freepik.com/free-vector/set-scenes-people-doing-activities_24877-62247.jpg?t=st=1734086782~exp=1734090382~hmac=74039282dc3f98f2f4e906d3e2a9229ec8acc6077e76712c2d0811330467a9c7&w=740" 
                alt="Mastery Activities" 
                className="rounded-lg object-cover w-full h-96" 
              />
            </figure>
            <div className="card-body items-center">
              <h2 className="card-title text-center text-primary font-semibold">กิจกรรมเพื่อการพัฒนาตนเอง</h2>
              <p className="text-center text-gray-600">
              กิจกรรมเพื่อการพัฒนาตนเอง คือ กิจกรรมที่เน้นการเรียนรู้ การพัฒนาตนเอง และการฝึกฝนทักษะ อาจต้องใช้ความพยายามและความอดทน
              </p>
              <div className="card-actions justify-center">
                <Link to="/mastery-activities">
                  <button className="btn btn-primary">เลือก</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default SelectActivity;
import Image from 'next/image';
import HeroMusic from '../../assets/hero-music1.png';

const Hero = () => {
  return (
    <section className="Hero my-28 px-20">
        <div className="flex justify-between py-3">
            <div className="text-section max-w-md">
                <h1 className="text-xl md:text-3xl lg:text-6xl font-extrabold font-inter tracking-normal uppercase">A place for <span className="bg-black rounded-lg text-white leading-normal p-1">Classical</span> Music</h1>
                <div className='bg-white rounded-full w-fit py-8 px-5 my-3'>
                    <p className='text-base text-black font-inter font-semibold'>Ultra Lo-fi Dreams</p>
                </div>
            </div>
            <div className="image-section">
                <Image src={HeroMusic} alt="Hero Music" />
            </div>
            <div className="extra-info">
                <p className='text-base font-semibold font-inter max-w-sm'>Compact and portable record cutter</p>
            </div>
        </div>
    </section>
  )
};

export default Hero;

import './Footer.css'
import { React } from 'react'
import { socialMedia } from '../../assets/ImportantData/socialMediaUrl'
import { pages } from '../../assets/ImportantData/pagesNameAndPath'
import { Link, NavLink } from 'react-router-dom'
const Footer = () => {
  return (
    <>
      <div className='flex w-[screen] footer'>
        <div className='flex flex-row md:pl-20'>
          <div className='w-1/2 footerContainer md:w-1/3'>
            <p className='text-[14px] md:text-[18px] footerHead'>CONTACT ME</p>
            <div className='mt-3 footerContent'>
              <p>Address:- Ashoka Tower, Shamli</p>
              <p>Uttar Pradesh, India</p>
              <p>PinCode:- 247776</p>
            </div>
            <div className='mt-3 break-all md:break-keep footerContent md:w-1/2'>
              <p>+91 7078825316</p>
              <p className='text-[14px] md:text-[14px]'>kirtibindalkb770@gmail.com</p>
            </div>
          </div>

          <div className='w-1/2 footerContainer md:w-1/3'>
            <p className=' text-[12px] md:text-[18px] footerHead'>FOLLOW ME:-</p>
            <div className='flex mt-4 text-center md:text-start '>
              {socialMedia.map((item, index) => (
                <Link to={item.link} key={index}  target="_blank" rel="noopener noreferrer" className='mr-5 md:mr-8 footerIcon'>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className='hidden 1/2 md:w-1/3 md:block md:ml-20 footerContainer'>
            <p className='text-[14px] md:text-[18px] footerHead'>QUICK LINKS</p>
            <div className='flex-col text-start '>
              <ul className='list-none'>
                {pages.map((item, index) => (
                  <li key={item} className='my-2 link'>
                    <NavLink
                      className={`nav-link ${({ isActive }) => (isActive ? 'active' : 'inactive')}`}
                      to={`${item.route}`}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr style={{ color: 'white' }} />
        <p className='copyright'>&#169;2025 Styleora All right reserved</p>
      </div>
    </>
  )
}

export default Footer

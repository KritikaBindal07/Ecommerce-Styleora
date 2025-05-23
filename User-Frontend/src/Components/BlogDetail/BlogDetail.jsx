import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { BiCategory, BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi'
import { CiCalendarDate, CiUser } from 'react-icons/ci'
import { ClipLoader } from 'react-spinners'
import { dislikeBlog, getaBlog, likeBlog, resetBlogState } from '../../services/Blogs/BlogAction'
import { userDetail } from '../../services/Authentication/authAction'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import moment from 'moment'
import './BlogDetail.css'
const BlogDetail = () => {
  const [blogLoading, setBlogLoading] = useState(true)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getBlogId = location.pathname.split('/')[2]
  const ablogState = useSelector((state) => state.blog)
  const { loading, aBlog, isSuccess } = ablogState
  const user = useSelector((state) => state.auth)
  const { userInformation } = user

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getaBlog(getBlogId))
        dispatch(userDetail())
        window.scrollTo(0, 0)
        setBlogLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleLikeDisLike = async (id, action) => {
    if (!Cookies.get('StyleoraUserToken')) {
      toast.error('Please login to like/dislike blog')
      navigate('/login')
    }
    if (action === 'like') {
      await dispatch(likeBlog(id))
      dispatch(getaBlog(getBlogId))
    } else {
      await dispatch(dislikeBlog(id))
      dispatch(getaBlog(getBlogId))
    }
  }

  return (
    <>
      {blogLoading ? (
        <div className='loader'>
          <ClipLoader
            color={'#52ab98'}
            loading={blogLoading}
            size={25}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        <div className='blogDetailPage'>
          {loading && (
            <div className='loader'>
              <ClipLoader
                color={'#52ab98'}
                loading={loading}
                size={25}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          )}
          <div className='blogdetailContainer w-[100vw] md:w-[70vw]'>
            <p className='blogName'>{aBlog?.title}</p>
            <div className='blogDetailNameAndDate'>
              <p className='blogDetailDate'>
                <CiCalendarDate size={16} />
                &nbsp; {moment(aBlog?.createdAt).format('DD MMM YYYY')}
              </p>
              <span className='borderBetween'>|</span>
              <p className='blogDetailName'>
                <CiUser size={16} />
                &nbsp; {aBlog?.author}
              </p>
              <span className='borderBetween'>|</span>
              <p className='blogDetailName'>
                <BiCategory size={16} />
                &nbsp; {aBlog?.category}
              </p>
            </div>
            <div className='blogDetailNameAndDate'>
              <div>
                <p className='blogDetailDate'>
                  {aBlog?.likes.some((user) => user._id === userInformation?._id) ? (
                    <span
                      className='cursor-pointer'
                      onClick={() => {
                        handleLikeDisLike(aBlog._id, 'like')
                      }}
                    >
                      {' '}
                      <BiSolidLike color={'#52ab98'} size={18} />
                    </span>
                  ) : (
                    <span
                      className='cursor-pointer'
                      onClick={() => {
                        handleLikeDisLike(aBlog._id, 'like')
                      }}
                    >
                      {' '}
                      <BiLike padding='5px' size={18} />
                    </span>
                  )}
                  &nbsp; {aBlog?.likes.length}
                </p>
              </div>
              <span className='borderBetween'>|</span>
              <div>
                <p className='blogDetailDate'>
                  {aBlog?.disLikes.some((user) => user._id === userInformation?._id) ? (
                    <span
                      className='cursor-pointer'
                      onClick={() => {
                        handleLikeDisLike(aBlog._id, 'dislike')
                      }}
                    >
                      {' '}
                      <BiSolidDislike padding='5px' color={'#FF6008'} size={18} />
                    </span>
                  ) : (
                    <span
                      className='cursor-pointer'
                      onClick={() => {
                        handleLikeDisLike(aBlog._id, 'dislike')
                      }}
                    >
                      {' '}
                      <BiDislike padding='5px' size={18} />
                    </span>
                  )}
                  &nbsp; {aBlog?.disLikes.length}
                </p>
              </div>
            </div>
            <img
              className='blogDetailImg'
              src={
                aBlog?.images[0]?.url ||
                'https://res.cloudinary.com/dytlgwywf/image/upload/v1709644422/tlbnraoyd03bekjtyuzk.jpg'
              }
              alt=''
            />
            <p
              className='text-justify'
              dangerouslySetInnerHTML={{ __html: aBlog?.description }}
            ></p>
          </div>
        </div>
      )}
    </>
  )
}

export default BlogDetail

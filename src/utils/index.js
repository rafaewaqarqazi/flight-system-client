export const canApply = (job, userId) => {
  return job.applications && job.applications.filter(application => application.user._id === userId).length > 0

}
export const getStatus = status => {
  switch (status) {
    case '1': {
      return 'Pending'
    }
    case '2': {
      return 'Test Scheduled'
    }
    case '3': {
      return 'Interview Scheduled'
    }
    case '4': {
      return 'Selected'
    }
    case '5': {
      return 'Application Rejected'
    }
    case '6': {
      return 'Selection Rejected'
    }
    default: {
      return ''
    }
  }
}
export const getTestInterviewStatus = status => {
  switch (status) {
    case '1': {
      return 'Pending'
    }
    case '2': {
      return 'Passed'
    }
    case '3': {
      return 'Failed'
    }
  }
}
export const getShortListedTest = applications => {
  return applications.filter(application => application.test).length
}
export const getShortListedInterviews = applications => {
  return applications.filter(application => application.interview).length
}

export const getRatings = reviews => {
  let rating = 0
  reviews.map(review => {
    rating += parseInt(review.rating)
  })
  return reviews.length === 0 ? 0 : (rating / reviews.length).toFixed(2)
}

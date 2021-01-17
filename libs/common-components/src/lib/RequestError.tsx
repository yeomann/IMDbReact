import React, { FC } from 'react'

const RequestError: FC<{ err: any | undefined }> = ({
  err,
}): JSX.Element | null => {
  if (err !== undefined) {
    return (
      <div>
        <h1>Error Performing Request</h1>
        {JSON.stringify(err)}
        {/* <pre>
          {Object.keys(err).length &&
            err.map((item, i) => {
              return (
                <>
                  <span key={i}>
                    <span>Message: {item.message}</span>
                    <span>Locations: {item.locations}</span>
                    <span>Path: {item.path}</span>
                  </span>
                </>
              )
            })}
        </pre> */}
        {/* <pre className="mt-2">GQLErrorsJSON = {JSON.stringify(err.graphQLErrors)}</pre>
        <h3>Network Request - Network Status: </h3>
        <h5 className="d-block blue-clr">
          <span className="bold b-clr">Name:</span> {err.networkError?.name}
        </h5>
        <h5 className="d-block blue-clr">
          <span className="bold b-clr">Message:</span> {err.networkError?.message}
        </h5>
        <h5 className="d-block blue-clr">
          <span className="bold b-clr">Stack:</span> {err.networkError?.stack}
        </h5>
        <pre style={{ height: '100%' }} className="mt-2">
          NetworkErrorsJSON = {JSON.stringify(err.networkError, null, 4)}
        </pre> */}
      </div>
    )
  }
  return null
}

export { RequestError }
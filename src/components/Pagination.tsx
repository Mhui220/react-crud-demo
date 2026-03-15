interface Props {
  page: number
  totalPages: number
  setPage: (page: number) => void
}

export default function Pagination({ page, totalPages, setPage }: Props) {
  return (
    <div className="mt-3">

      <button
        className="btn btn-light"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page} / {totalPages}
      </span>

      <button
        className="btn btn-light"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>

    </div>
  )
}
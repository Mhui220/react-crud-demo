import React from "react"

interface Props {
  show: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
}

export default function Modal({
  show,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm"
}: Props) {
  if (!show) return null

  return (
    <div className="modal d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {children}
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            {onConfirm && (
              <button
                className="btn btn-danger"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
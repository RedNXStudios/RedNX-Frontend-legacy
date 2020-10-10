import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarEditor from "react-avatar-editor";
import { withTranslation, WithTranslation } from "react-i18next";
import Net from "../../utils/Net";
import ProfileStore, { StoreProps } from "../../undux/ProfileStore";

interface IProps extends WithTranslation, StoreProps {}

interface IState {
  file: any;
  fileName: string | null;
  scale: number;
  borderRadius: number;
  rotate: number;
  uploading: boolean;
  success: boolean;
  errorId: number;
  errorMessage?: string;
}

class UploadProfilePicture extends React.Component<IProps, IState> {
  private fileInput: any = React.createRef();
  private avatarEditor: AvatarEditor | null = null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      file: null,
      fileName: null,
      scale: 1,
      borderRadius: 1,
      rotate: 0,
      uploading: false,
      success: false,
      errorId: -1,
    };
  }

  setEditorRef = (avatarEditor: AvatarEditor) => {
    this.avatarEditor = avatarEditor;
  };

  changeFile = () => {
    if (this.fileInput.current.files.length > 0) {
      this.setState({
        success: false,
        file: this.fileInput.current.files[0],
        fileName: this.fileInput.current.files[0].name,
      });
    }
  };

  rotateAdd90 = () => {
    var rotation = this.state.rotate;
    rotation = rotation + 90;
    if (rotation > 360) {
      rotation = 90;
    }
    this.setState({
      rotate: rotation,
    });
  };

  rotateRemove90 = () => {
    var rotation = this.state.rotate;
    rotation = rotation - 90;
    if (rotation < 0) {
      rotation = 270;
    }
    this.setState({
      rotate: rotation,
    });
  };

  savePicture = async () => {
    if (this.state.uploading === true) return;
    if (this.avatarEditor) {
      this.setState({ errorId: -1, success: false });
      if (this.state.file == null) {
        this.setState({
          errorId: 3754,
          errorMessage: "No image selected.",
          success: false,
        });
        return;
      }
      this.setState({ uploading: true });
      const canvas = this.avatarEditor.getImage().toDataURL("image/png");
      Net.post("/api/account/upload/picture", {
        picture: canvas,
      })
        .then((e) => {
          if (e.data && e.data.error) {
            this.setState({
              errorId: e.data.error.code,
              errorMessage: e.data.error.message,
              uploading: false,
            });
            return;
          }
          if (e.data && e.data.success) {
            this.setState({ success: true, uploading: false });
            this.props.store.set("picture")(e.data.guid);
            $("#uploadAvatarModal").modal("hide");
          } else this.setState({ uploading: false });
        })
        .catch((e) => {
          //console.info(e);
          //this.setState({ uploading: false });
          if (e && e.response.data && e.response.data.error) {
            this.setState({
              errorId: e.response.data.error.code,
              errorMessage: e.response.data.error.message,
              uploading: false,
            });
            return;
          } else this.setState({ uploading: false });
        });
      /*try {
          this.setState({ uploading: true });
          const canvas = this.avatarEditor.getImage().toDataURL("image/png");
          const response = await Net.post("/profile/putpicture", {
            picture: canvas,
          });
          if (response.data.success) {
            this.setState({ uploading: false, success: true });
            this.props.profile.set("picture")(response.data.guid);
            $("#uploadAvatarModal").modal("hide");
          } else {
            this.setState({
              uploading: false,
              error: response.data.message,
              errorData: response.data,
            });
          }
        } catch (err) {
          this.setState({ uploading: false, error: err });
        }*/
    } else {
      console.error("No editor found!");
      alert("No editor found!");
    }
  };

  render() {
    let { t, i18n } = this.props;
    return (
      <div
        className="modal fade"
        id="uploadAvatarModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="uploadAvatarModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{t("modals.uploadAvatar")}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div
                className={`bubble-error ${this.state.errorId > -1 && "show"}`}
              >
                {this.state.errorId > -1 &&
                i18n.exists(
                  "error.changeEmail." + this.state.errorId.toString()
                )
                  ? t("error.changeEmail." + this.state.errorId.toString())
                  : this.state.errorMessage}
              </div>
              <AvatarEditor
                ref={this.setEditorRef}
                image={this.state.file}
                width={150}
                height={150}
                border={10}
                color={[0, 0, 0, 0.6]}
                scale={this.state.scale}
                borderRadius={this.state.borderRadius}
                rotate={this.state.rotate}
                style={{ display: "block", margin: "0 auto" }}
              />
              <br />
              <div className="custom-file mb-3">
                <input
                  type="file"
                  className="custom-file-input"
                  id="validatedCustomFile"
                  required
                  onChange={this.changeFile}
                  ref={this.fileInput}
                  accept="image/x-png,image/gif,image/jpeg"
                />
                <label
                  className="custom-file-label"
                  htmlFor="validatedCustomFile"
                >
                  {this.state.fileName == null
                    ? t("modals.chooseFile")
                    : this.state.fileName}
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="formControlRange">Zoom</label>
                <input
                  type="range"
                  className="form-control-range"
                  min="1"
                  max="2"
                  step="0.01"
                  id="formControlRange"
                  onChange={(e) => {
                    this.setState({
                      scale: parseFloat(e.target.value),
                    });
                  }}
                  value={this.state.scale}
                />
              </div>
              <div className="form-group">
                <label htmlFor="formControlRange">Border Radius</label>
                <input
                  type="range"
                  className="form-control-range"
                  min="0"
                  max="100"
                  step="1"
                  id="formControlRange"
                  onChange={(e) => {
                    this.setState({
                      borderRadius: parseFloat(e.target.value),
                    });
                  }}
                  value={this.state.borderRadius}
                />
              </div>
              <div className="form-group text-center">
                <label htmlFor="formControlRange">Rotation</label>
                <br />
                <button
                  type="button"
                  className="btn btn-primary mx-1"
                  onClick={this.rotateRemove90}
                >
                  <FontAwesomeIcon icon="undo" />
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-1"
                  onClick={this.rotateAdd90}
                >
                  <FontAwesomeIcon icon="redo" />
                </button>
                <input
                  type="range"
                  className="form-control-range mt-1"
                  min="0"
                  max="360"
                  step="1"
                  id="formControlRange"
                  onChange={(e) => {
                    this.setState({
                      rotate: parseFloat(e.target.value),
                    });
                  }}
                  value={this.state.rotate}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {t("modals.close")}
              </button>
              <button
                type="button"
                className={`btn ${
                  this.state.success ? "btn-success" : "btn-primary"
                }`}
                onClick={this.savePicture}
              >
                {this.state.uploading ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">{t("modals.saving")}</span>
                  </div>
                ) : this.state.success ? (
                  t("modals.saved")
                ) : this.state.file == null ? (
                  t("modals.removePicture")
                ) : (
                  t("modals.save")
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileStore.withStore(withTranslation()(UploadProfilePicture));

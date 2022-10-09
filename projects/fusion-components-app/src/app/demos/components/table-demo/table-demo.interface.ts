export enum VolumeState {
  ACTIVE = 'active',
  DELETED = 'deleted',
}

export enum VolumeAccess {
  locked = 'locked',
  readOnly = 'readOnly',
  readWrite = 'readWrite',
  replicationTarget = 'replicationTarget',
  snapMirrorTarget = 'snapMirrorTarget'
}

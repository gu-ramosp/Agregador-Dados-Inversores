# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: agregador.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='agregador.proto',
  package='',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x0f\x61gregador.proto\"\"\n\x13simpleStringRequest\x12\x0b\n\x03req\x18\x01 \x01(\t\"(\n\x14simpleStringResponse\x12\x10\n\x08resposta\x18\x01 \x01(\t\"g\n\x0finfoFTP_Request\x12\x0c\n\x04host\x18\x01 \x01(\t\x12\r\n\x05porta\x18\x02 \x01(\t\x12\x0f\n\x07usuario\x18\x03 \x01(\t\x12\r\n\x05senha\x18\x04 \x01(\t\x12\x17\n\x0fservidor_labens\x18\x05 \x01(\t\"\xf5\x01\n\rAgregregation\x12\x13\n\x0b\x64\x61ta_inicio\x18\x01 \x01(\t\x12\x10\n\x08\x64\x61ta_fim\x18\x02 \x01(\t\x12\x0e\n\x06\x63idade\x18\x03 \x01(\t\x12\x0b\n\x03vdc\x18\x04 \x01(\t\x12\x0b\n\x03idc\x18\x05 \x01(\t\x12\x0b\n\x03vac\x18\x06 \x01(\t\x12\x0b\n\x03iac\x18\x07 \x01(\t\x12\x0c\n\x04\x66req\x18\x08 \x01(\t\x12\x0b\n\x03pac\x18\t \x01(\t\x12\x0b\n\x03\x65ne\x18\n \x01(\t\x12\x0b\n\x03whs\x18\x0b \x01(\t\x12\x0c\n\x04\x43\x44TE\x18\x0c \x01(\x08\x12\x0c\n\x04\x43IGS\x18\r \x01(\x08\x12\x0c\n\x04MONO\x18\x0e \x01(\x08\x12\x0c\n\x04POLI\x18\x0f \x01(\x08\x12\x0c\n\x04\x65rro\x18\x10 \x01(\x08\x32\xf4\x01\n\x0b\x41ggregation\x12;\n\x0cSendDataPath\x12\x14.simpleStringRequest\x1a\x15.simpleStringResponse\x12\x38\n\rSendParamsFTP\x12\x10.infoFTP_Request\x1a\x15.simpleStringResponse\x12\x31\n\x0fMakeAggregation\x12\x0e.Agregregation\x1a\x0e.Agregregation\x12;\n\rsendGraphData\x12\x14.simpleStringRequest\x1a\x14.simpleStringRequestb\x06proto3'
)




_SIMPLESTRINGREQUEST = _descriptor.Descriptor(
  name='simpleStringRequest',
  full_name='simpleStringRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='req', full_name='simpleStringRequest.req', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=19,
  serialized_end=53,
)


_SIMPLESTRINGRESPONSE = _descriptor.Descriptor(
  name='simpleStringResponse',
  full_name='simpleStringResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='resposta', full_name='simpleStringResponse.resposta', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=55,
  serialized_end=95,
)


_INFOFTP_REQUEST = _descriptor.Descriptor(
  name='infoFTP_Request',
  full_name='infoFTP_Request',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='host', full_name='infoFTP_Request.host', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='porta', full_name='infoFTP_Request.porta', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='usuario', full_name='infoFTP_Request.usuario', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='senha', full_name='infoFTP_Request.senha', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='servidor_labens', full_name='infoFTP_Request.servidor_labens', index=4,
      number=5, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=97,
  serialized_end=200,
)


_AGREGREGATION = _descriptor.Descriptor(
  name='Agregregation',
  full_name='Agregregation',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='data_inicio', full_name='Agregregation.data_inicio', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='data_fim', full_name='Agregregation.data_fim', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='cidade', full_name='Agregregation.cidade', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='vdc', full_name='Agregregation.vdc', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='idc', full_name='Agregregation.idc', index=4,
      number=5, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='vac', full_name='Agregregation.vac', index=5,
      number=6, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='iac', full_name='Agregregation.iac', index=6,
      number=7, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='freq', full_name='Agregregation.freq', index=7,
      number=8, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='pac', full_name='Agregregation.pac', index=8,
      number=9, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='ene', full_name='Agregregation.ene', index=9,
      number=10, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='whs', full_name='Agregregation.whs', index=10,
      number=11, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='CDTE', full_name='Agregregation.CDTE', index=11,
      number=12, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='CIGS', full_name='Agregregation.CIGS', index=12,
      number=13, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='MONO', full_name='Agregregation.MONO', index=13,
      number=14, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='POLI', full_name='Agregregation.POLI', index=14,
      number=15, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='erro', full_name='Agregregation.erro', index=15,
      number=16, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=203,
  serialized_end=448,
)

DESCRIPTOR.message_types_by_name['simpleStringRequest'] = _SIMPLESTRINGREQUEST
DESCRIPTOR.message_types_by_name['simpleStringResponse'] = _SIMPLESTRINGRESPONSE
DESCRIPTOR.message_types_by_name['infoFTP_Request'] = _INFOFTP_REQUEST
DESCRIPTOR.message_types_by_name['Agregregation'] = _AGREGREGATION
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

simpleStringRequest = _reflection.GeneratedProtocolMessageType('simpleStringRequest', (_message.Message,), {
  'DESCRIPTOR' : _SIMPLESTRINGREQUEST,
  '__module__' : 'agregador_pb2'
  # @@protoc_insertion_point(class_scope:simpleStringRequest)
  })
_sym_db.RegisterMessage(simpleStringRequest)

simpleStringResponse = _reflection.GeneratedProtocolMessageType('simpleStringResponse', (_message.Message,), {
  'DESCRIPTOR' : _SIMPLESTRINGRESPONSE,
  '__module__' : 'agregador_pb2'
  # @@protoc_insertion_point(class_scope:simpleStringResponse)
  })
_sym_db.RegisterMessage(simpleStringResponse)

infoFTP_Request = _reflection.GeneratedProtocolMessageType('infoFTP_Request', (_message.Message,), {
  'DESCRIPTOR' : _INFOFTP_REQUEST,
  '__module__' : 'agregador_pb2'
  # @@protoc_insertion_point(class_scope:infoFTP_Request)
  })
_sym_db.RegisterMessage(infoFTP_Request)

Agregregation = _reflection.GeneratedProtocolMessageType('Agregregation', (_message.Message,), {
  'DESCRIPTOR' : _AGREGREGATION,
  '__module__' : 'agregador_pb2'
  # @@protoc_insertion_point(class_scope:Agregregation)
  })
_sym_db.RegisterMessage(Agregregation)



_AGGREGATION = _descriptor.ServiceDescriptor(
  name='Aggregation',
  full_name='Aggregation',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=451,
  serialized_end=695,
  methods=[
  _descriptor.MethodDescriptor(
    name='SendDataPath',
    full_name='Aggregation.SendDataPath',
    index=0,
    containing_service=None,
    input_type=_SIMPLESTRINGREQUEST,
    output_type=_SIMPLESTRINGRESPONSE,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='SendParamsFTP',
    full_name='Aggregation.SendParamsFTP',
    index=1,
    containing_service=None,
    input_type=_INFOFTP_REQUEST,
    output_type=_SIMPLESTRINGRESPONSE,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='MakeAggregation',
    full_name='Aggregation.MakeAggregation',
    index=2,
    containing_service=None,
    input_type=_AGREGREGATION,
    output_type=_AGREGREGATION,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='sendGraphData',
    full_name='Aggregation.sendGraphData',
    index=3,
    containing_service=None,
    input_type=_SIMPLESTRINGREQUEST,
    output_type=_SIMPLESTRINGREQUEST,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_AGGREGATION)

DESCRIPTOR.services_by_name['Aggregation'] = _AGGREGATION

# @@protoc_insertion_point(module_scope)

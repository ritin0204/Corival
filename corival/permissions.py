import rest_framework.permissions as permissions

class IsRecruiter(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_recruiter:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_recruiter:
            return True
        return False
    
    